import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    password: String,
    imageUrl: String,
});

const User = new mongoose.model("User", userSchema);
const Reader = new mongoose.model("Reader", userSchema);

export { User, Reader };