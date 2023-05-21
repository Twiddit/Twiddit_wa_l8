import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-general-info-twiddits',
  templateUrl: './general-info-twiddits.component.html',
  styleUrls: ['./general-info-twiddits.component.css']
})
export class GeneralInfoTwidditsComponent {

  constructor(private http: HttpClient) {
  }
  
  info: any;
  twiddits: any = [];
  current: any;
  url: string = '/assets/infoFeed.json';

  ngOnInit() {
    this.http.get(this.url).subscribe(res => {
      this.getInfo(res)
    });
  }

  getInfo(data: any) {
    this.info = data.data.userFeed;
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
    console.log(twiddits)
    for (let i = 0; i < twiddits.length; i++) {
      if (twiddits[i].id === id){
        this.current = Object.entries(twiddits[i]);
      }
    }
    console.log(this.current)
  }

}
