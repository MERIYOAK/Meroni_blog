import mongoose from "mongoose";

const slide_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    URL: String,
    title: String
});

const Finance_slide_post = mongoose.model("finance_slide_post", slide_schema);

export { Finance_slide_post };