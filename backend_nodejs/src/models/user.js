import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    password: String,
    imageUrl: String,
    role: String,
    birthDate: String,
    telephone: String,
    country: String,
    city: String,
    bio: String
});

const User = new mongoose.model("User", userSchema);

export { User };