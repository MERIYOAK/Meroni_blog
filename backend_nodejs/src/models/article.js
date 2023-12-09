import mongoose from "mongoose";

const article_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    title: String,
    date: String,
    image: String,
    content: String,
    goToURL: String
});

const Article = mongoose.model("Article", article_schema);

export { Article };