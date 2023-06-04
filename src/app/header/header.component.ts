import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Twiddit, User } from '../models/register';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  rates: any | undefined;

  result: any | undefined;
  username: string = "";
  photo: string = "";
  loading = true;
  error: any;
  twiddits: Twiddit[] = [];
  users: User[] = [];
  usernameText: string = '';

  textFind: string = ''

  checkoutForm = this.formBuilder.group({
    userId: "",
    twiddit_text: ['', Validators.required]
  });

  form!: FormGroup;

  constructor(private modalService: NgbModal, private apollo: Apollo, private formBuilder: FormBuilder, public router: Router) {
  }

  ngOnInit() {


    var userId = sessionStorage.getItem('userId');

    this.checkoutForm.setValue({ userId: userId, twiddit_text: '' })

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

  createTwiddit(userId: any, twiddit_text: any) {
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
    this.router.navigateByUrl('feed');
  }

  logout() {
    var token = {'accessToken': sessionStorage.getItem('token')};
    //var token = sessionStorage.getItem('token');

    this.apollo.watchQuery({
      query: gql`
      query Query($token: AuthorizationData!) {
        logout(token: $token) {
          statusCode
          message
        }
      }
    `,
      variables: {
        token
      }
    }).valueChanges.subscribe((result: any) => {
    });
    sessionStorage.clear()
    location.reload();
  }



  findTwidits() {

    var text = this.textFind

    this.findUsers() 

    this.apollo.watchQuery({
      query: gql`
      query Query($text: String!) {
        searchTwiddit(text: $text) {
       _id,
              userId,
              communidditsId,
              retwidditId,
              text,
              creationDate,
              imageURL1,
              imageURL2,
              imageURL3,
              imageURL4,
              videoURL,
              tags,
        }
      }
    `,
      variables: {
        text
      }
    }).valueChanges.subscribe((result: any) => {
      this.result = result.data
      this.twiddits = this.result.searchTwiddit
      console.log(this.twiddits)
    });

  }


  findUsers() {

    var text = this.textFind

    this.apollo.watchQuery({
      query: gql`
      query Query($text: String!) {
        searchUser(text:$text) {
          id,
            email,
            description,
            birthday,
            profile_photo,
            phone,
            username
          }
        }
    `,
      variables: {
        text
      }
    }).valueChanges.subscribe((result: any) => {
      this.result = result.data
      this.users = this.result.searchUser
      console.log(this.users)
    });


  }



  goInfoTwiddit(twiddit_id: any, userName: any) {
    console.log(twiddit_id)

    this.router.navigateByUrl('feed/info-twiddit', { state: { id: twiddit_id, username: this.usernameText } });
  }


  name(userId: any) {


    this.apollo.watchQuery({
      query: gql`
      query Query($userId: Int!){
        viewProfile(id: $userId){
            username
        }
    }
    `,
      variables: {
        userId
      }
    }).valueChanges.subscribe((result: any) => {
      this.rates = result.data
      this.usernameText = this.rates.viewProfile.username;
      console.log(this.usernameText)

    });


  }



  Unfollow(followedId: string){
    var followerId = sessionStorage.getItem('userId');
    console.log("data")
    this.apollo.mutate({
      mutation: gql`
      mutation unfollow($followerId: Int!, $followedId: Int!){
          unfollow(followerId: $followerId,
            followedId: $followedId){
              message
        }
        }
      
      `,
      variables: {
        followerId,
        followedId
      }
    }).subscribe(
      ({ data }) => {
        console.log('got data', data);
      },
      error => {
        console.log('there was an error sending the query', error);
      },
    );
   // window.location.reload()
  }

  goUnoA() {
    this.router.navigateByUrl('feed/interface');
  }


  follow(followedId: string){
    var followerId = sessionStorage.getItem('userId');
    console.log("data")
    this.apollo.mutate({
      mutation: gql`
      mutation createRelationship($followerId: Int!, $followedId: Int!){
          createRelationship(relationship:{
            followerId:$followerId,
            followedId:$followedId, 
            blocked: false
          }){
            message
          }
        }
      
      `,
      variables: {
        followerId,
        followedId
      }
    }).subscribe(
      ({ data }) => {
        console.log('got data', data);
      },
      error => {
        console.log('there was an error sending the query', error);
      },
    );
    
 //   window.location.reload()
  }











}
