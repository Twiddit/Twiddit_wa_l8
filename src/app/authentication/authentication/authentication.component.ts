import { Apollo, gql } from 'apollo-angular';


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  rates: any | undefined;
  loading = true;
  error: any;
  
  form!: FormGroup;



  constructor(private apollo: Apollo,private  fb: FormBuilder,private appComponent: AppComponent , private router: Router) {
    this.form = this.fb.group({
      username: [],      
      password: []
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

login(email:string,password:string){

  //const email = "alerodriguezmar@unal.edu.co";
 // const password = "12345";

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

}
