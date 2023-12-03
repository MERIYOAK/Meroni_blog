import mongoose from "mongoose";

const my_journey_post_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    title: String,
    content: {
        intro: String,
        body: String,
        conclude: String
    },
    image: String,
    date: String,
    authorURL: String,
    likesCount: { type: Number, default: 0 }, // New field to store likes count
    likes: {
        type: [
            {
                userId: String,
            }
        ],
        default: []
    },
    commentsCount: { type: Number, default: 0 },
    comments: {
        type: [
            {
                comment: String,
                userId: String,
                userFirstName: String,
                userMiddleName: String,
                userImage: String,
                date: String
            }
        ],
        default: []
    },
    sharesCount: { type: Number, default: 0 },
    shares: {
        type: [
            {
                userId: String
            }
        ],
        default: []
    }
});

const My_journey_post = mongoose.model("my_journey_post", my_journey_post_schema);
const Finance_post = mongoose.model("finance_post", my_journey_post_schema);
const Philosophy_post = mongoose.model("philosophy_post", my_journey_post_schema);
const Science_post = mongoose.model("science_post", my_journey_post_schema);
const Technology_post = mongoose.model("technology_post", my_journey_post_schema);
const Art_post = mongoose.model("art_post", my_journey_post_schema);
const Politics_post = mongoose.model("politics_post", my_journey_post_schema);

export { My_journey_post, Finance_post, Philosophy_post, Science_post, Technology_post, Art_post, Politics_post };