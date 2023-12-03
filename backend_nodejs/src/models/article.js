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

const Philosophy_article_post = mongoose.model("philosophy_article_post", article_schema);
const Science_article_post = mongoose.model("science_article_post", article_schema);

export { Philosophy_article_post, Science_article_post };