interface Wallet {
  messageSigned: boolean;
  chainId: string;
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
  id: string;
  publicAddress: string;
  twitterUser: string;
  twitterVerified: boolean;
  twitterFollowed: string[];
  isRegistered: boolean;
  anwers?: Question[];
}
