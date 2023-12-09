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

const Body_post3 = mongoose.model("Body_post3", body_post3_schema);

export { Body_post3 };;