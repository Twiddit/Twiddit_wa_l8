import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-unoa',
  templateUrl: './unoa.component.html',
  styleUrls: ['./unoa.component.css']
})
export class UnoaComponent {

  info: any;
  option = [1,2,3,4,5,6,7,8,9,10];
  messages: any = [];
  current: any;
  loading: any;
  rates: any | undefined;
  error: any;
  form!: FormGroup;


  constructor(private http: HttpClient, private apollo: Apollo, public router: Router, private  fb: FormBuilder) {
    this.form = this.fb.group({
      email: [],      
      number: []
    });
  }

  prueba(/* mail: string, n: number */) {
    this.messages = []
    /* this.http.get(this.url).subscribe(res => {
      this.getInfo(res)
      
    }); */

    let email = this.form.get(['email'])?.value;
    let number = this.form.get(['number'])?.value;

    console.log(email, typeof(email))
    console.log(number, typeof(number))

    this.loading = true;


    this.apollo.watchQuery({
      query: gql`
      query Query($email: String!, $number: Int!){
        consumeGetMessages(email: $email, n: $number){
          result{
            result
          }
        }
    }
    `,
  variables: {
    email,
    number
  }
  }).valueChanges.subscribe((result: any) => {
    this.rates = result.data;
    this.loading = result.loading;
    this.getInfo(this.rates);
    this.error = result.error;
  });
  }

  getInfo(data: any) {
    this.info = data;
    console.log(data)
    this.transformData(this.info.consumeGetMessages.result.result)
  }

  transformData(data: any){
    for (let i = 0; i < data.length; i++) {
      var obj = JSON.parse(data[i]);
      this.messages.push(obj)
    }
    console.log(this.messages)
  }

  changeDateFormat(date: any) {
    const day = date.slice(0,10);
    const hour = date.slice(11,19);
    return hour + "  " + day
  }

}
