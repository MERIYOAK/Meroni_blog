// //jshint esversion:6
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { config as configDotenv } from "dotenv";
import cors from "cors";
import MongoStore from 'connect-mongo';
import authenticate from "./src/middlewares/authenticate.js";
import authorize from "./src/middlewares/authorize.js";
import Admin_creator from "./src/controllers/Admin_creator.js";
import default_router from "./src/routes/default_routers.js";
import fetch_posts from "./src/routes/fetch_posts.js";
import add_post from "./src/routes/add_post.js";
import update_post from "./src/routes/update_post.js";
import delete_post from "./src/routes/delete_post.js";
import retrieve_post from "./src/routes/retrieve_post.js";
import sign_up from "./src/routes/sign_up.js";
import user_data from "./src/routes/user_data.js";
import logout from "./src/routes/logout.js";
import login from "./src/routes/login.js";
import increase_like from "./src/routes/increase_like.js";
import decrease_like from "./src/routes/decrease_like.js";
import shares from "./src/routes/shares.js";
import add_comment from "./src/routes/add_comment.js";
import pending_editors from "./src/routes/pending_editors.js";
import verifyToken from "./src/middlewares/verify_token.js";
import refresh_token from "./src/routes/refresh_token.js";
import change_profile_image from "./src/routes/change_profile_image.js";
import change_profile from "./src/routes/change_profile.js";

// Load environment variables from .env file
configDotenv();

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reqiuredRolesForModeration = process.env.REQUIRED_ROLES_FOR_MODERATION.split(',');
const requiredRolesForPostCRUD = process.env.REQUIRED_ROLES_FOR_POST_CRUD.split(',');
const requiredRolesForReactionCRUD = process.env.REQUIRED_ROLES_FOR_REACTION_CRUD.split(',');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

const mongoStore = new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
    collection: 'sessions',
    ttl: process.env.SESSION_TTL,
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
        maxAge: process.env.SESSION_TTL * 1000,
        //httpOnly: true,
        //secure: true,
        //sameSite: 'Strict',
    },
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../frontend_react_app/dist"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public'), { 'Content-Type': 'text/css' }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

Admin_creator.createAdmin();

app.use(default_router);
app.use(fetch_posts);
app.use(sign_up);
app.use(login);
app.use(refresh_token);

const authAndAuthorize = [authenticate, verifyToken];

app.use([...authAndAuthorize, authorize(requiredRolesForReactionCRUD)],
    //app.use(verifyToken,
    user_data,
    logout,
    increase_like,
    decrease_like,
    shares,
    add_comment,
    change_profile,
    change_profile_image);

app.use([...authAndAuthorize, authorize(requiredRolesForPostCRUD)],
    //app.use(verifyToken,
    add_post,
    retrieve_post);

app.use([...authAndAuthorize, authorize(reqiuredRolesForModeration)],
    //app.use(verifyToken,
    update_post,
    delete_post,
    pending_editors);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

