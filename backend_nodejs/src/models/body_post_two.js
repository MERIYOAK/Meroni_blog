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

const Art_body_post = mongoose.model("art_body_post", body_post2_schema);

export { Art_body_post };