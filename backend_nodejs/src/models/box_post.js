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

const Box_post = mongoose.model("Box_post", box_post_schema);

export { Box_post };