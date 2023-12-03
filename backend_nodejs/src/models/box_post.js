import mongoose from "mongoose";

const box_post_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    title: String,
    link: String,
    author_name: String,
    authorURL: String,
});

const Technology_box_post = mongoose.model("technology_box_post", box_post_schema);

export { Technology_box_post };