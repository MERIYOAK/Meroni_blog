import mongoose from "mongoose";

const daily_quote_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    quote: String,
    author: String
});

const Quote = mongoose.model("Quote", daily_quote_schema);

export { Quote };