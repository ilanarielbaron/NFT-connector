import mongoose from "mongoose";

interface todoModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  publicAddress: string;
  twitterUser: string;
  twitterVerified: boolean;
  twitterFollowed: string[];
  isRegistered: boolean;
  anwers: Question[];
}

const answersSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  publicAddress: {
    type: String,
    required: true,
  },
  twitterUser: {
    type: String,
    required: true,
  },
  twitterVerified: {
    type: Boolean,
    required: true,
  },
  twitterFollowed: {
    type: [String],
    required: true,
  },
  isRegistered: {
    type: Boolean,
    required: true,
  },
  answers: {
    type: [answersSchema],
    required: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, todoModelInterface>("User", userSchema);

export { User };
