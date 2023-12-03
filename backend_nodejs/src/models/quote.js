import mongoose from "mongoose";

const daily_quote_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    quote: String,
    author: String
});

const Daily_quote = mongoose.model("daily_quote", daily_quote_schema);
const Politics_hero_post = mongoose.model("politics_hero_post", daily_quote_schema);

export { Daily_quote, Politics_hero_post };