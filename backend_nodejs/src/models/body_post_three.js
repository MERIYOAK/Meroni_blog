import mongoose from "mongoose";

const body_post3_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    title: String,
    line: String,
    link: String,
    brands: {
        icon: String,
        link: String
    },
    image1: String,
    image2: String,
    image3: String
});

const Politics_body_post = mongoose.model("politics_body_post", body_post3_schema);

export { Politics_body_post };;