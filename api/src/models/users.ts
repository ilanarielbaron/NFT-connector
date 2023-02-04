import mongoose from "mongoose";

interface todoModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  publicAddress: string;
  twitterUser?: string;
  twitterVerified?: boolean;
  twitterFollowed?: string[];
  isRegistered?: boolean;
  answers?: Question[];
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
    required: false,
  },
  twitterVerified: {
    type: Boolean,
    required: false,
  },
  twitterFollowed: {
    type: [String],
    required: false,
  },
  isRegistered: {
    type: Boolean,
    required: true,
  },
  answers: {
    type: [answersSchema],
    required: false,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, todoModelInterface>("User", userSchema);

export { User };
