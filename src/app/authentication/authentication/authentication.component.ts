import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  rates: any[] | undefined;
  loading = true;
  error: any;


  constructor(private apollo: Apollo) {}
 
  ngOnInit() {

    this.apollo
    .watchQuery({
      query: gql`
      query Query {
        login(loginBody:{
            email: "alerodriguezmar@unal.edu.co",
            password: "12345"
          }){
            message
            data{
              accessToken
            }
        
        }
    }
  
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.rates = result.data
      this.loading = result.loading;
      this.error = result.error;
      console.log(this.rates)
    });
   }

}
