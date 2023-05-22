import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  rates: any | undefined;
  username: string = "";
  photo: string = "";
  loading = true;
  error: any;

  checkoutForm = this.formBuilder.group({
    userId: "",
    twiddit_text: ['', Validators.required ]
  });

  form!: FormGroup;

  constructor(private modalService: NgbModal, private apollo: Apollo, private formBuilder: FormBuilder,) {
  }

  ngOnInit() {

    
    var userId = sessionStorage.getItem('userId');

    this.checkoutForm.setValue({userId: userId, twiddit_text:''})

    this.apollo.watchQuery({
      query: gql`
      query Query($userId: Int!){
        viewProfile(id: $userId){
            email,
            birthday,
            phone,
            profile_photo,
            description,
            username
        }
    }
    `,
    variables: {
      userId
    }
    }).valueChanges.subscribe((result: any) => {
      this.rates = result.data
      this.loading = result.loading;
      this.username = this.rates.viewProfile.username;
      this.photo = this.rates.viewProfile.profile_photo;
      this.error = result.error;
    });

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  onSubmit() {
    this.createTwiddit(this.checkoutForm.value.userId, this.checkoutForm.value.twiddit_text);
    this.checkoutForm.reset();
  }

  createTwiddit(userId: any, twiddit_text: any){
    var date = new Date().toISOString();;
    console.log(date)
    this.apollo.mutate({
      mutation: gql`
      mutation CreateTwiddit($userId: Int!, $twiddit_text: String!, $date: String!){
        createTwiddit(twiddit: {
          userId: $userId,
          text: $twiddit_text,
          creationDate: $date
        }){
          _id
          text
          retwidditId
        }
      }
      `,
      variables: {
        userId,
        twiddit_text,
        date
      }
    }).subscribe(
      ({ data }) => {
        console.log('got data', data);
      },
      error => {
        console.log('there was an error sending the query', error);
      },
    );
  }

  logout(){
    sessionStorage.clear()
    location.reload();
  }
}
