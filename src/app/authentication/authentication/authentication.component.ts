import { Apollo, gql } from 'apollo-angular';


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { register } from 'src/app/models/register';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  rates: any | undefined;
  loading = true;
  error: any;
  registerUser!:register;
  
  form!: FormGroup;

  register!: FormGroup;



  constructor(private apollo: Apollo,private  fb: FormBuilder,private appComponent: AppComponent , private router: Router) {
    this.form = this.fb.group({
      username: [],      
      password: []
    });

    this.register = this.fb.group({
      email: [],      
      password: [],
      birthday: ['',  Validators.pattern('^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\\d{4}$')],
      phone: [],
      profilePhoto:[],
      description: [],
      username: [],
    });



  }

  
 
  ngOnInit() {

    

  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
   let password = this.form.get(['password'])?.value;
   let username = this.form.get(['username'])?.value;

   console.log(password+username)
    this.login(username,password)
    //location.reload();
  }


  onSubmitRegister() {

    this.registerUser = this.register.getRawValue()
    
    this.registerUser.profilePhoto = "photo"
  this.registerUser.birthday=  this.castDate(this.registerUser.birthday)
    this.registeruser(this.registerUser);
 


  }

login(email:string,password:string){


  this.apollo
  .watchQuery({
    query: gql`
    query Query($email: String!, $password: String!) {
      login(loginBody: { email: $email, password: $password }) {
        message
        data {
          userId,
          accessToken
        }
      }
    }
  `,
  variables: {
    email,
    password
  }
  })
  .valueChanges.subscribe((result: any) => {
  
    this.rates = result.data
    this.loading = result.loading;
    sessionStorage.setItem('userId',this.rates.login.data.userId);
    sessionStorage.setItem('token',this.rates.login.data.accessToken);
    this.error = result.error;
    this.appComponent.isLogin = true;
    if(this.rates.login.data.accessToken != null){
      this.router.navigate(['feed'])
    }
  });
 }




 registeruser(user:register){

  const REGISTER_MUTATION = gql`
  mutation Register($registerBody: RegisterInput!) {
    register(registerBody: $registerBody) {
      message
    }
  }
`;
const birthday = user.birthday
const description = user.description
const email = user.email
const password = user.password
const phone = user.phone
const profilePhoto = user.profilePhoto
const username = user.username
console.log(user)

console.log(username)

this.apollo.mutate({
  mutation: gql`
    mutation {
      register(registerBody: {
        birthday: $birthday,
        description: $description,
        email: $email,
        password: $password,
        phone: "$phone",
        profilePhoto: $profilePhoto,
        username: $username
      }) {
        message
      }
    }
  `,
  variables: {
    birthday,
    description,
    email,
    password,
    phone,
    profilePhoto,
    username
  }
}).subscribe(
  ({ data }) => {
    console.log('got data', data);
  },
  error => {
    console.log('there was an error sending the query', error);
  }
);

 }




// this.apollo.mutate({
//   mutation: REGISTER_MUTATION,
//   variables: {
//      registerBody: user
//    }
//  }).subscribe(
//    ({ data }) => {
//     console.log('got data', data);
//    },
//   error => {
//     console.log('there was an error sending the query', error);
//    }, 
//  )
 

castDate(date:string):string{

  const sdate = date.split('-')

  console.log(sdate[2]+'-'+sdate[1]+'-'+sdate[0])

  return sdate[2]+'-'+sdate[1]+'-'+sdate[0];
}


}
