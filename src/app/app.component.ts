import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Twiddit_wa';


  isLogin: boolean = false;

  constructor(private apollo: Apollo) {}
 
  ngOnInit() {
    this.checkIsLogin();
  }



  checkIsLogin(){
    const token = sessionStorage.getItem('key');
    if(token != null){
      this.isLogin = true;
    }

  }
}




