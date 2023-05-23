export type register = {
    email: string;
    password: string;
    birthday: string;
    phone: string;
    profilePhoto: string;
    description: string;
    username: string;
  };

  export type Twiddit = {
    _id: string;
    userId: number;
    communidditsId: string;
    retwidditId: string;
    text: string;
    creationDate: string;
    imageURL1: string;
    imageURL2: string;
    imageURL3: string;
    imageURL4: string;
    videoURL: string;
    tags: string[];
  }

  export type User = {
    id: string;
    email: string;
    description: string;
    birthday: string;
    profile_photo: string;
    phone: string;
    username:string;
  }
  