interface Question {
  question: string;
  answer: string;
}

interface IUser {
  publicAddress: string;
  twitterUser: string;
  twitterVerified: boolean;
  twitterFollowed: string[];
  isRegistered: boolean;
  answers: Question[];
}
