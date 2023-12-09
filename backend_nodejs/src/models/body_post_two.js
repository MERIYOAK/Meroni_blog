import mongoose from "mongoose";

const body_post2_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    type: String,
    title: String,
    content: String,
    link: String,
    date: String,
    writer: String,

});

const Body_post2 = mongoose.model("Body_post2", body_post2_schema);

export { Body_post2 };