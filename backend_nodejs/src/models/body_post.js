import mongoose from "mongoose";

const body_post_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    main_title: String,
    sub_title: String,
    main_link: String,
    image: String,
    article_title: String,
    article_content: String,
    article_link: String,
    date: String,
    author_name: String,
    authorURL: String
});

const Technology_body_post = mongoose.model("technology_body_post", body_post_schema);

export { Technology_body_post };