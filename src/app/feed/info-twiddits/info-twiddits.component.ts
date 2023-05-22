import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-twiddits',
  templateUrl: './info-twiddits.component.html',
  styleUrls: ['./info-twiddits.component.css']
})
export class InfoTwidditsComponent {

  id: any /* = '64227017f68242e3c447d88d' */;
  username: any;
  /* info = {
    "twiddit": {
      "_id": "64227017f68242e3c447d88d",
      "userId": 1,
      "communidditsId": "507f191e810c19729de860ea",
      "text": "Este es un twiddit con tags",
      "tags": [
        "Meme",
        "Gracioso",
        "Trending"
      ],
      "creationDate": "2023-03-28T04:41:59.610Z",
      "__v": 0
    },
    "number_of_replies": 2,
    "replies": [
      {
        "_id": "646aa89ea6a96341876f5633",
        "userId": 4,
        "twidditId": "64227017f68242e3c447d88d",
        "text": "hola",
        "creationDate": "0233-01-01T00:00:00.000Z",
        "__v": 0
      },
      {
        "_id": "646aa8b6a6a96341876f5635",
        "userId": 4,
        "twidditId": "64227017f68242e3c447d88d",
        "text": "hola",
        "creationDate": "0233-01-01T00:00:00.000Z",
        "__v": 0
      }
    ],
    "number_of_likes": 0,
    "like": [],
    "number_of_dislikes": 0,
    "dislike": [],
    "isRetwiddit": false
  }; */
  gfg = true;
  info: any;
  twiddits: any = [];
  current: any;
  rates: any | undefined;
  loading = true;
  error: any;

  checkoutForm = this.formBuilder.group({
    userId: "",
    reply_text: ['', Validators.required ]
  });

  form!: FormGroup;

  constructor(private modalService: NgbModal, public router: Router, private apollo: Apollo, private formBuilder: FormBuilder){
    this.username = this.router.getCurrentNavigation()?.extras.state?.['username'];
    this.id = this.router.getCurrentNavigation()?.extras.state?.['id'];
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    var twiddit_id = this.id;

    this.apollo.watchQuery({
      query: gql`
      query Query($twiddit_id: String!){
        infoTwiddit(twidditId: $twiddit_id){
          twiddit{
            _id
            userId
            text
            retwidditId
            creationDate
            tags
          }
          isRetwiddit
          number_of_replies
          replies{
            _id
            userId
            threadId
            twidditId
            text
            creationDate
          }
          number_of_likes
          like{
            userId
            creationDate
            twidditId
            replyId
          }
          number_of_dislikes
          dislike{
            userId
            creationDate
            twidditId
            replyId
          }
          originalTwiddit{
            twiddit{
              _id
              text
              retwidditId
              creationDate
              tags
            }
            isRetwiddit
          }
        }
    }
    `,
    variables: {
      twiddit_id
    }
    }).valueChanges.subscribe((result: any) => {
      this.rates = result.data
      this.loading = result.loading;
      console.log(this.rates.infoTwiddit);
      this.info = this.rates.infoTwiddit
      this.error = result.error;
    });
  }

  onSubmit() {
    this.createTwiddit(this.checkoutForm.value.reply_text);
    this.checkoutForm.reset();
  }

  createTwiddit(twiddit_text: any){
    var date = new Date().toISOString();;
    var twiddit_id = this.id;
    var userId = sessionStorage.getItem('userId');
    console.log(date)
    this.apollo.mutate({
      mutation: gql`
      mutation CreateReply($userId: Int!, $twiddit_text: String!, $date: String!, $twiddit_id: String!){
        createReply(reply: {
          userId: $userId,
          text: $twiddit_text,
          creationDate: $date,
          twidditId: $twiddit_id
        }){
          _id
          text
        }
      }
      `,
      variables: {
        userId,
        twiddit_text,
        date,
        twiddit_id
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

  deleteReply(reply_id: any){
    this.apollo.mutate({
      mutation: gql`
      mutation DeleteReply($reply_id: String!){
        deleteReply(replyId: $reply_id){
          _id
          text
        }
      }
      `,
      variables: {
        reply_id
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

  /*ngOnInit(){
    console.log(this.info)

     var temp = {
      id: this.info.twiddit._id,
      user: this.info.twiddit.username,
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
  } */
}

