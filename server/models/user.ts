import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  //   _id: Types.ObjectId;
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 8 },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
