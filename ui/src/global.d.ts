interface Wallet {
  messageSigned: boolean;
  address: string;
}

interface TwitterAccount {
  accountUser: string;
  isVerified: boolean;
  twitterIdsFollowed: string[];
}

interface Question {
  question: string;
  answer: string;
}

interface User {
  _id: string;
  publicAddress: string;
  twitterUser?: string;
  twitterVerified?: boolean;
  twitterFollowed?: string[];
  isRegistered?: boolean;
  answers?: Question[];
}
