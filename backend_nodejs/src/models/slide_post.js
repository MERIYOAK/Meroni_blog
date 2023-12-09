import mongoose from "mongoose";

const slide_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    URL: String,
    title: String
});

const Slide = mongoose.model("finance_slide_post", slide_schema);

export { Slide };