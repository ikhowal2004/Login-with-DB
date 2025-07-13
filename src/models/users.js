import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  age: Number,
  password: String
});

const Test1 = mongoose.model('Test1', userSchema);
export default Test1;
