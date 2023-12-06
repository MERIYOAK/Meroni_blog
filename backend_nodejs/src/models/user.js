import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    password: String,
    imageUrl: String,
    role: String
});

const User = new mongoose.model("User", userSchema);

export { User };