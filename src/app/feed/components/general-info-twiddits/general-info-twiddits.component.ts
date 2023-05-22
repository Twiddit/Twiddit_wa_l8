import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-general-info-twiddits',
  templateUrl: './general-info-twiddits.component.html',
  styleUrls: ['./general-info-twiddits.component.css']
})
export class GeneralInfoTwidditsComponent {

  constructor(private http: HttpClient, private apollo: Apollo, public router: Router) {
  }

  info: any;
  twiddits: any = [];
  current: any;
  rates: any | undefined;
  loading = true;
  error: any;
  url: string = '/assets/infoFeed.json';

  ngOnInit() {

    var userId = sessionStorage.getItem('userId');

    /* this.http.get(this.url).subscribe(res => {
      this.getInfo(res)
    }); */

    this.apollo.watchQuery({
      query: gql`
      query Query($userId: Int!){
        userFeed(userId: $userId){
          user{
            username 
          }
          twiddit {
            twiddit {
              _id
              userId
              communidditsId
              retwidditId
              text
              creationDate
              imageURL1
              imageURL2
              imageURL3
              imageURL4
              videoURL
              tags
            }
            number_of_replies
            number_of_likes
            number_of_dislikes
            isRetwiddit
          }
        }
    }
    `,
  variables: {
    userId
  }
  }).valueChanges.subscribe((result: any) => {
    this.rates = result.data
    this.loading = result.loading;
    this.getInfo(this.rates)
    this.error = result.error;
  });
  }

  getInfo(data: any) {
    this.info = data.userFeed;
    this.getTwiddits();
  }

  getTwiddits() {
    for (let i = 0; i < this.info.length; i++) {
      for (let j = 0; j < this.info[i].twiddit.length; j++) {
        var images = 0;
        if(this.info[i].twiddit[j].twiddit.imageURL1 !== null){
          images += 1;
        }
        if(this.info[i].twiddit[j].twiddit.imageURL2 !== null){
          images += 1;
        }
        if(this.info[i].twiddit[j].twiddit.imageURL3 !== null){
          images += 1;
        }
        if(this.info[i].twiddit[j].twiddit.imageURL4 !== null){
          images += 1;
        }

        var temp = {
          id: this.info[i].twiddit[j].twiddit._id,
          user: this.info[i].user.username,
          communidditsId: this.info[i].twiddit[j].twiddit.communidditsId,
          retwidditId: this.info[i].twiddit[j].twiddit.retwidditId,
          text: this.info[i].twiddit[j].twiddit.text,
          creationDate: this.info[i].twiddit[j].twiddit.creationDate.split("T")[0],
          imageURL1: this.info[i].twiddit[j].twiddit.imageURL1,
          imageURL2: this.info[i].twiddit[j].twiddit.imageURL2,
          imageURL3: this.info[i].twiddit[j].twiddit.imageURL3,
          imageURL4: this.info[i].twiddit[j].twiddit.imageURL4,
          videoURL: this.info[i].twiddit[j].twiddit.videoURL,
          tags: this.info[i].twiddit[j].twiddit.tags,
          number_of_replies: this.info[i].twiddit[j].number_of_replies,
          replies: this.info[i].twiddit[j].replies,
          number_of_likes: this.info[i].twiddit[j].number_of_likes,
          like: this.info[i].twiddit[j].like,
          number_of_dislikes: this.info[i].twiddit[j].number_of_dislikes,
          dislike: this.info[i].twiddit[j].dislike,
          number_of_images: images,
          isRetwiddit: this.info[i].twiddit[j].isRetwiddit,
        }
        this.twiddits.unshift(temp);
      }
    }
  }

  retwiddit(id: string, twiddits: any){
    console.log(id)
    for (let i = 0; i < twiddits.length; i++) {
      if (twiddits[i].id === id){
        this.current = Object.entries(twiddits[i]);
      }
    }
    //console.log(this.current)
  }

  createLike(twiddit_id: string){
    var userId = sessionStorage.getItem('userId');
    var date = new Date().toISOString();;
    this.apollo.mutate({
      mutation: gql`
      mutation CreateLike($twiddit_id: String!, $userId: Int!, $date: String!){
        createLike(like: {
          userId: $userId,
          twidditId: $twiddit_id,
          creationDate: $date
        }){
          _id
        }
      }
      `,
      variables: {
        twiddit_id,
        userId,
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
    window.location.reload()
  }

  createDislike(twiddit_id: string){
    var userId = sessionStorage.getItem('userId');
    var date = new Date().toISOString();;
    this.apollo.mutate({
      mutation: gql`
      mutation CreateDislike($twiddit_id: String!, $userId: Int!, $date: String!){
        createDislike(dislike: {
          userId: $userId,
          twidditId: $twiddit_id,
          creationDate: $date
        }){
          _id
        }
      }
      `,
      variables: {
        twiddit_id,
        userId,
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
    window.location.reload()
  }

  goInfoTwiddit(twiddit_id: any, userName:any) {
    console.log(twiddit_id)
    this.router.navigateByUrl('feed/info-twiddit', { state: { id: twiddit_id, username: userName } });
  }

}
