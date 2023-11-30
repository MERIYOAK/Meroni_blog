// //jshint esversion:6
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import ejs from "ejs";
import methodOverride from 'method-override';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { config as configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import { handleImage } from "./handleImage.js";
import MongoStore from 'connect-mongo';

// Load environment variables from .env file
configDotenv();

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static("../frontend_react_app/dist"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public'), { 'Content-Type': 'text/css' }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

// Replace 'your-mongodb-uri' with your MongoDB connection URI
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

// Middleware for authentication
const authenticate = (req, res, next) => {
    if (req.session.isAuthenticated) {
        console.log('Authenticated');
        next();
    } else {
        console.log('Not authenticated');
        res.redirect('/');
    }
};

// Middleware for authorization
const authorize = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.session.userRole)) {
            console.log('Authorized');
            next();
        } else {
            console.log('Not authorized');
            res.redirect('/');
        }
    };
};

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    password: String,
    imageUrl: String,
});

const User = new mongoose.model("User", userSchema);
const Reader = new mongoose.model("Reader", userSchema);

const createInitialUser = async () => {
    try {
        const existingUser = await User.findOne({ email: process.env.EMAIL });

        if (!existingUser) {
            try {
                const hash = await bcrypt.hash(process.env.PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const singleUser = new User({
                    id: 1,
                    firstName: process.env.FIRST_NAME,
                    middleName: process.env.MIDDLE_NAME,
                    lastName: process.env.LAST_NAME,
                    email: process.env.EMAIL,
                    image: './uploads/Meron.jpg',
                    password: hash
                });
                try {
                    await singleUser.save();
                    console.log('Initial user created successfully');
                } catch (saveError) {
                    console.error('Error saving user to the database:', saveError);
                }
            } catch (hashError) {
                console.error('Error hashing password:', hashError);
            }
        } else {
            console.log('User with the provided email already exists');
        }
    } catch (error) {
        console.error('Error checking for existing user:', error);
    }
};

createInitialUser();


// const likesSchema = new mongoose.Schema({
//     count: { type: Number, default: 0 }
// });

// const Likes = mongoose.model('Likes', likesSchema);

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

// const likeSchema = new mongoose.Schema({
//     postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//     userId: String,
//     timestamp: String
// });

// const Like = mongoose.model('Like', likeSchema);

//mongoose.model('Post', my_journey_post_schema);

const daily_quote_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    quote: String,
    author: String
});

const Daily_quote = mongoose.model("daily_quote", daily_quote_schema);
const Politics_hero_post = mongoose.model("politics_hero_post", daily_quote_schema);

const slide_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    URL: String,
    title: String
});

const Finance_slide_post = mongoose.model("finance_slide_post", slide_schema);

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

const box_post_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    title: String,
    link: String,
    author_name: String,
    authorURL: String,
});

const Technology_box_post = mongoose.model("technology_box_post", box_post_schema);

const body_post2_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    image: String,
    type: String,
    title: String,
    content: String,
    link: String,
    date: String,
    writer: String,

});

const Art_body_post = mongoose.model("art_body_post", body_post2_schema);

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

const handleRequest = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../frontend_react_app/dist', 'index.html'));
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

// Attach the same handler function to multiple URLs
app.get("/", handleRequest);
app.get("/finance", handleRequest);
app.get("/philosophy", handleRequest);
app.get("/science", handleRequest);
app.get("/tech", handleRequest);
app.get("/art", handleRequest);
app.get("/politics", handleRequest);
app.get("/sign_up", handleRequest);
app.get("/user_profile", handleRequest);
app.get("/log_in", handleRequest);
app.get("/log_out", handleRequest);

// used to fetch all posts and daily quote to app.jsx in index.html
app.get('/posts', async (req, res) => {
    try {
        const my_journey_posts = await My_journey_post.find().sort({ id: -1 });
        const daily_quote = await Daily_quote.findOne().sort({ _id: -1 });
        const finance_posts = await Finance_post.find().sort({ id: -1 });
        const finance_slide_posts = await Finance_slide_post.find().sort({ id: -1 });
        const philosophy_article_posts = await Philosophy_article_post.find().sort({ id: -1 });
        const philosophy_posts = await Philosophy_post.find().sort({ id: -1 });
        const science_posts = await Science_post.find().sort({ id: -1 });
        const sci_hero_posts = await Science_article_post.find().sort({ _id: -1 }).limit(6);
        const tech_posts = await Technology_post.find().sort({ id: -1 });
        const tech_body_posts = await Technology_body_post.find().sort({ _id: -1 }).limit(2);
        const tech_trending_box_posts = await Technology_box_post.find().sort({ id: -1 });
        const art_posts = await Art_post.find().sort({ id: -1 });
        const art_body_posts = await Art_body_post.find().sort({ id: -1 }).limit(10);
        const politics_posts = await Politics_post.find().sort({ id: -1 });
        const black_body_content = await Politics_body_post.findOne().sort({ _id: -1 });
        const hero_content_box_posts = await Politics_hero_post.find().sort({ _id: -1 }).limit(3);


        res.json({
            my_journey_posts,
            daily_quote,
            finance_posts,
            finance_slide_posts,
            philosophy_article_posts,
            philosophy_posts,
            science_posts,
            sci_hero_posts,
            tech_posts,
            tech_body_posts,
            tech_trending_box_posts,
            art_posts,
            art_body_posts,
            politics_posts,
            black_body_content,
            hero_content_box_posts
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.json({ error: 'Error fetching data' });
    }
});

// used to render verify_editorial_privileges.ejs
app.get('/editorial_privileges', (req, res) => {
    try {
        res.render('verify_editorial_privileges.ejs');
    } catch (error) {
        console.error('Error rendering verify_editorial_privileges.ejs:', error);
        res.json({ error: 'Error rendering verify_editorial_privileges.ejs' });
    }
});

app.post('/verify_credentials', async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: username });
        if (foundUser) {
            const result = await bcrypt.compare(password, foundUser.password);

            if (result) {
                req.session.isAuthenticated = true;
                req.session.userRole = process.env.SESSION_ROLE;

                req.session.save((err) => {
                    if (err) {
                        console.error('Error saving session:', err);
                        res.json({ error: 'Error saving session' });
                    } else {
                        res.render('crud');
                    }
                });
            } else {
                res.json({ error: 'Incorrect password' });
            }
        } else {
            res.json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error verifying credentials:', error);
        res.json({ error: 'Error verifying credentials' });
    }
});

// used to render adder template based on post type
app.get("/addPost", authenticate, authorize([process.env.SESSION_ROLE]), (req, res) => {
    const postType = req.query.type;

    try {
        switch (postType) {
            case 'my_journey_post':
            case 'finance_post':
            case 'philosophy_post':
            case 'science_post':
            case 'technology_post':
            case 'art_post':
            case 'politics_post':
                res.render("post_adder");
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                res.render("daily_quote_adder");
                break;
            case 'finance_slide_post':
                res.render("slide_adder");
                break;
            case 'philosophy_article_post':
            case 'science_article_post':
                res.render("article_adder_template");
                break;
            case 'technology_body_post':
                res.render("body_post_adder_template");
                break;
            case 'technology_box_post':
                res.render("box_post_adder_template");
                break;
            case 'art_body_post':
                res.render("body_post2_adder_template");
                break;
            case 'politics_body_post':
                res.render("body_post3_adder_template");
                break;
            default:
                res.json({ error: 'Invalid post type' });
        }
    } catch (error) {
        console.error('Error rendering adder template:', error);
        res.json({ error: 'Error rendering adder template' });
    }
});

// used to add post or daily quote to database
app.post("/postAdder", authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postType = req.body.postType;

    try {
        let lastPost;
        let newPost;
        let lastId = 0;

        switch (postType) {
            case 'my_journey_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await My_journey_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new My_journey_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'my_journey_post'
                });
                break;
            }
            case 'finance_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Finance_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Finance_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'finance_post',
                });
                break;
            }
            case 'philosophy_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Philosophy_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Philosophy_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'philosophy_post',
                });
                break;
            }
            case 'science_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Science_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Science_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'science_post',
                });
                break;
            }
            case 'technology_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Technology_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'technology_post',
                });
                break;
            }
            case 'art_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Art_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Art_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'art_post',
                });
                break;
            }
            case 'politics_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Politics_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'politics_post',
                });
                break;
            }
            case 'daily_quote': {
                const { quote, author } = req.body;

                lastPost = await Daily_quote.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Daily_quote({
                    id,
                    author,
                    quote,
                    tableName: 'daily_quote'
                });
                break;
            }
            case 'politics_hero_post': {
                const { quote, author } = req.body;

                lastPost = await Politics_hero_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_hero_post({
                    id,
                    author,
                    quote,
                    tableName: 'politics_hero_post'
                });
                break;
            }
            case 'finance_slide_post': {
                const { image, URL, title } = req.body;

                lastPost = await Finance_slide_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Finance_slide_post({
                    id,
                    image,
                    URL,
                    title,
                    tableName: 'finance_slide_post'
                });
                break;
            }
            case 'philosophy_article_post': {
                const { title, date, image, content, goToURL } = req.body;

                lastPost = await Philosophy_article_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Philosophy_article_post({
                    id,
                    title,
                    date,
                    image,
                    content,
                    goToURL,
                    tableName: 'philosophy_article_post'
                });
                break;
            }
            case 'science_article_post': {
                const { title, date, image, content, goToURL } = req.body;

                lastPost = await Science_article_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Science_article_post({
                    id,
                    title,
                    date,
                    image,
                    content,
                    goToURL,
                    tableName: 'science_article_post'
                });
                break;
            }
            case 'technology_body_post': {
                const { main_title, sub_title, main_link, image, article_title, article_content, article_link, date, author_name, authorURL } = req.body;

                lastPost = await Technology_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_body_post({
                    id,
                    main_title,
                    sub_title,
                    main_link,
                    image,
                    article_title,
                    article_content,
                    article_link,
                    date,
                    author_name,
                    authorURL,
                    tableName: 'technology_body_post'
                });
                break;
            }
            case 'technology_box_post': {
                const { title, image, link, author_name, authorURL } = req.body;

                lastPost = await Technology_box_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_box_post({
                    id,
                    title,
                    image,
                    link,
                    author_name,
                    authorURL,
                    tableName: 'technology_box_post'
                });
                break;
            }
            case 'art_body_post': {
                const { title, image, type, content, link, date, writer } = req.body;

                lastPost = await Art_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Art_body_post({
                    id,
                    title,
                    image,
                    type,
                    content,
                    link,
                    date,
                    writer,
                    tableName: 'art_body_post'
                });
                break;
            }
            case 'politics_body_post': {
                const { title, line, link, brands, image1, image2, image3 } = req.body;

                lastPost = await Politics_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_body_post({
                    id,
                    title,
                    line,
                    link,
                    brands: {
                        icon: brands.icon,
                        link: brands.link
                    },
                    image1,
                    image2,
                    image3,
                    tableName: 'politics_body_post'
                });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (newPost) {
            await newPost.save();
            res.render('post_added_confirmation');
        }
    } catch (error) {
        console.error("Error saving post or quote:", error);
        res.status(500).send("Error saving post or quote.");
    }
});


//used to render crud to be redirected from confiramtion actions
app.get("/crud", authenticate, authorize([process.env.SESSION_ROLE]), (req, res) => {
    try {
        res.render("crud");
    } catch (error) {
        console.error("Error rendering crud:", error);
        res.status(500).send("Error rendering crud.");
    }
})

// used to render id input page based on post type
app.get("/updatePost", authenticate, authorize([process.env.SESSION_ROLE]), (req, res) => {
    try {
        res.render("post_updater");
    } catch (error) {
        console.error("Error rendering post updater:", error);
        res.status(500).send("Error rendering post updater.");
    }
});

// used to render post updater template based on postId
app.get('/postUpdater', authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postId = req.query.postId;
    const postType = req.query.postType;
    let post;

    if (!isNaN(postId) && Number.isInteger(parseFloat(postId))) {
        try {
            switch (postType) {
                case 'my_journey_post':
                    post = await My_journey_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'finance_post':
                    post = await Finance_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'philosophy_post':
                    post = await Philosophy_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'science_post':
                    post = await Science_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'technology_post':
                    post = await Technology_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'art_post':
                    post = await Art_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'politics_post':
                    post = await Politics_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'daily_quote':
                    post = await Daily_quote.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'politics_hero_post':
                    post = await Politics_hero_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'finance_slide_post':
                    post = await Finance_slide_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'philosophy_article_post':
                    post = await Philosophy_article_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'science_article_post':
                    post = await Science_article_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'technology_body_post':
                    post = await Technology_body_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'technology_box_post':
                    post = await Technology_box_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'art_body_post':
                    post = await Art_body_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                case 'politics_body_post':
                    post = await Politics_body_post.findOne({ id: parseInt(postId) }).exec();
                    break;
                default:
                    res.status(400).json({ error: 'Invalid post type' });
            }

            if (post) {
                switch (postType) {
                    case 'my_journey_post':
                    case 'finance_post':
                    case 'philosophy_post':
                    case 'science_post':
                    case 'technology_post':
                    case 'art_post':
                    case 'politics_post':
                        res.render('post_updater_template', { post });
                        break;
                    case 'daily_quote':
                    case 'politics_hero_post':
                        res.render('daily_quote_updater_template', { post });
                        break;
                    case 'finance_slide_post':
                        res.render('slide_updater_template', { post });
                        break;
                    case 'philosophy_article_post':
                    case 'science_article_post':
                        res.render('article_updater_template', { post });
                        break;
                    case 'technology_body_post':
                        res.render('body_post_updater_template', { post });
                        break;
                    case 'technology_box_post':
                        res.render('box_post_updater_template', { post });
                        break;
                    case 'art_body_post':
                        res.render('body_post2_updater_template', { post });
                        break;
                    case 'politics_body_post':
                        res.render('body_post3_updater_template', { post });
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid post type' });
                }
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).json({ error: 'Error fetching post' });
        }
    } else {
        res.status(400).json({ error: 'Invalid postId' });
    }
});

// used to update post
app.post('/updateMyPost/:id/:tableName', authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postId = req.params.id;
    const postType = req.params.tableName;
    let post;

    try {
        switch (postType) {
            case 'my_journey_post': {
                post = await My_journey_post.findOne({ id: postId });
                break;
            }
            case 'finance_post': {
                post = await Finance_post.findOne({ id: postId });
                break;
            }
            case 'philosophy_post': {
                post = await Philosophy_post.findOne({ id: postId });
                break;
            }
            case 'science_post': {
                post = await Science_post.findOne({ id: postId });
                break;
            }
            case 'technology_post': {
                post = await Technology_post.findOne({ id: postId });
                break;
            }
            case 'art_post': {
                post = await Art_post.findOne({ id: postId });
                break;
            }
            case 'politics_post': {
                post = await Politics_post.findOne({ id: postId });
                break;
            }
            case 'daily_quote': {
                post = await Daily_quote.findOne({ id: postId });
                break;
            }
            case 'politics_hero_post': {
                post = await Politics_hero_post.findOne({ id: postId });
                break;
            }
            case 'finance_slide_post': {
                post = await Finance_slide_post.findOne({ id: postId });
                break;
            }
            case 'philosophy_article_post': {
                post = await Philosophy_article_post.findOne({ id: postId });
                break;
            }
            case 'science_article_post': {
                post = await Science_article_post.findOne({ id: postId });
                break;
            }
            case 'technology_body_post': {
                post = await Technology_body_post.findOne({ id: postId });
                break;
            }
            case 'technology_box_post': {
                post = await Technology_box_post.findOne({ id: postId });
                break;
            }
            case 'art_body_post': {
                post = await Art_body_post.findOne({ id: postId });
                break;
            }
            case 'politics_body_post': {
                post = await Politics_body_post.findOne({ id: postId });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            switch (postType) {
                case 'my_journey_post':
                case 'finance_post':
                case 'philosophy_post':
                case 'science_post':
                case 'technology_post':
                case 'art_post':
                case 'politics_post':
                    post.title = req.body.title;
                    post.content.intro = req.body.content.intro;
                    post.content.body = req.body.content.body;
                    post.content.conclude = req.body.content.conclude;
                    post.image = req.body.image;
                    post.date = req.body.date;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'daily_quote':
                case 'politics_hero_post':
                    post.quote = req.body.quote;
                    post.author = req.body.author;
                    break;
                case 'finance_slide_post':
                    post.image = req.body.image;
                    post.URL = req.body.URL;
                    post.title = req.body.title;
                    break;
                case 'philosophy_article_post':
                case 'science_article_post':
                    post.title = req.body.title;
                    post.date = req.body.date;
                    post.image = req.body.image;
                    post.content = req.body.content;
                    post.goToURL = req.body.goToURL;
                    break;
                case 'technology_body_post':
                    post.main_title = req.body.main_title;
                    post.sub_title = req.body.sub_title;
                    post.main_link = req.body.main_link;
                    post.image = req.body.image;
                    post.article_title = req.body.article_title;
                    post.article_content = req.body.article_content;
                    post.article_link = req.body.article_link;
                    post.date = req.body.date;
                    post.author_name = req.body.author_name;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'technology_box_post':
                    post.title = req.body.title;
                    post.image = req.body.image;
                    post.link = req.body.link;
                    post.author_name = req.body.author_name;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'art_body_post':
                    post.title = req.body.title;
                    post.image = req.body.image;
                    post.link = req.body.link;
                    post.content = req.body.content;
                    post.type = req.body.type;
                    post.date = req.body.date;
                    post.writer = req.body.writer;
                    break;
                case 'politics_body_post':
                    post.title = req.body.title;
                    post.line = req.body.line;
                    post.link = req.body.link;
                    post.brands.icon = req.body.brands.icon;
                    post.brands.link = req.body.brands.link;
                    post.image1 = req.body.image1;
                    post.image2 = req.body.image2;
                    post.image3 = req.body.image3;
                    break;
                default:
                    res.status(400).json({ error: 'Invalid post type' });
            }

            await post.save();
            res.render('post_updated_confirmation');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// used to render id input page based on post type
app.get("/deletePost", authenticate, authorize([process.env.SESSION_ROLE]), (req, res) => {
    try {
        res.render("post_deleter");
    } catch (error) {
        console.error('Error rendering post deleter template:', error);
        res.status(500).json({ error: 'Error rendering post deleter template' });
    }
});

// used to render post deleter template based on postId
app.get('/postDeleter', authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postId = req.query.postId;
    const postType = req.query.postType;
    let post;

    try {
        if (!isNaN(postId) && Number.isInteger(parseFloat(postId))) {
            try {
                switch (postType) {
                    case 'my_journey_post':
                        post = await My_journey_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'finance_post':
                        post = await Finance_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'philosophy_post':
                        post = await Philosophy_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'science_post':
                        post = await Science_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'technology_post':
                        post = await Technology_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'art_post':
                        post = await Art_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'politics_post':
                        post = await Politics_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'daily_quote':
                        post = await Daily_quote.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'politics_hero_post':
                        post = await Politics_hero_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'finance_slide_post':
                        post = await Finance_slide_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'philosophy_article_post':
                        post = await Philosophy_article_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'science_article_post':
                        post = await Science_article_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'technology_body_post':
                        post = await Technology_body_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'technology_box_post':
                        post = await Technology_box_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'art_body_post':
                        post = await Art_body_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    case 'politics_body_post':
                        post = await Politics_body_post.findOne({ id: parseInt(postId) }).exec();
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid post type' });
                }
                if (post) {
                    switch (postType) {
                        case 'my_journey_post':
                        case 'finance_post':
                        case 'philosophy_post':
                        case 'science_post':
                        case 'technology_post':
                        case 'art_post':
                        case 'politics_post':
                            res.render('post_deleter_template', { post });
                            break;
                        case 'daily_quote':
                        case 'politics_hero_post':
                            res.render('daily_quote_deleter_template', { post });
                            break;
                        case 'finance_slide_post':
                            res.render('slide_deleter_template', { post });
                            break;
                        case 'philosophy_article_post':
                        case 'science_article_post':
                            res.render('article_deleter_template', { post });
                            break;
                        case 'technology_body_post':
                            res.render('body_post_deleter_template', { post });
                            break;
                        case 'technology_box_post':
                            res.render('box_post_deleter_template', { post });
                            break;
                        case 'art_body_post':
                            res.render('body_post2_deleter_template', { post });
                            break;
                        case 'politics_body_post':
                            res.render('body_post3_deleter_template', { post });
                            break;
                        default:
                            res.status(400).json({ error: 'Invalid post type' });
                    }
                } else {
                    res.status(404).json({ error: 'Post not found' });
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                res.status(500).json({ error: 'Error fetching post' });
            }
        } else {
            res.status(400).json({ error: 'Invalid postId' });
        }
    } catch (error) {
        console.error('Error rendering post deleter template:', error);
        res.status(500).json({ error: 'Error rendering post deleter template' });
    }
});

// used to delete post
app.delete('/deleteMyPost/:id/:tableName', authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postId = req.params.id;
    const postType = req.params.tableName;
    let post;

    try {
        switch (postType) {
            case 'my_journey_post': {
                post = await My_journey_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'finance_post': {
                post = await Finance_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'philosophy_post': {
                post = await Philosophy_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'science_post': {
                post = await Science_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'technology_post': {
                post = await Technology_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'art_post': {
                post = await Art_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'politics_post': {
                post = await Politics_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'daily_quote': {
                post = await Daily_quote.findOneAndRemove({ id: postId });
                break;
            }
            case 'politics_hero_post': {
                post = await Politics_hero_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'finance_slide_post': {
                post = await Finance_slide_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'philosophy_article_post': {
                post = await Philosophy_article_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'science_article_post': {
                post = await Science_article_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'technology_body_post': {
                post = await Technology_body_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'technology_box_post': {
                post = await Technology_box_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'art_body_post': {
                post = await Art_body_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'politics_body_post': {
                post = await Politics_body_post.findOneAndRemove({ id: postId });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.render('post_deleted_confirmation');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
});

app.get("/allPost", authenticate, authorize([process.env.SESSION_ROLE]), async (req, res) => {
    const postType = req.query.type;
    let allPosts;

    try {
        switch (postType) {
            case 'my_journey_post':
                allPosts = await My_journey_post.find().sort({ id: -1 });
                break;
            case 'finance_post':
                allPosts = await Finance_post.find().sort({ id: -1 });
                break;
            case 'philosophy_post':
                allPosts = await Philosophy_post.find().sort({ id: -1 });
                break;
            case 'science_post':
                allPosts = await Science_post.find().sort({ id: -1 });
                break;
            case 'technology_post':
                allPosts = await Technology_post.find().sort({ id: -1 });
                break;
            case 'art_post':
                allPosts = await Art_post.find().sort({ id: -1 });
                break;
            case 'politics_post':
                allPosts = await Politics_post.find().sort({ id: -1 });
                break;
            case 'philosophy_article_post':
                allPosts = await Philosophy_article_post.find().sort({ id: -1 });
                break;
            case 'science_article_post':
                allPosts = await Science_article_post.find().sort({ id: -1 });
                break;
            case 'technology_body_post':
                allPosts = await Technology_body_post.find().sort({ id: -1 });
                break;
            case 'art_body_post':
                allPosts = await Art_body_post.find().sort({ id: -1 });
                break;
            case 'politics_body_post':
                allPosts = await Politics_body_post.find().sort({ id: -1 });
                break;
            case 'technology_box_post':
                allPosts = await Technology_box_post.find().sort({ id: -1 });
                break;
            case 'politics_hero_post':
                allPosts = await Politics_hero_post.find().sort({ id: -1 });
                break;
            case 'daily_quote':
                allPosts = await Daily_quote.find().sort({ id: -1 });
                break;
            case 'finance_slide_post':
                allPosts = await Finance_slide_post.find().sort({ id: -1 });
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (allPosts) {
            switch (postType) {
                case 'my_journey_post':
                case 'finance_post':
                case 'philosophy_post':
                case 'science_post':
                case 'technology_post':
                case 'art_post':
                case 'politics_post':
                    res.render('all_posts', { posts: allPosts });
                    break;
                case 'philosophy_article_post':
                case 'science_article_post':
                    res.render('all_articles', { posts: allPosts });
                    break;
                case 'technology_body_post':
                    res.render('all_body_posts', { posts: allPosts });
                    break;
                case 'art_body_post':
                    res.render('all_body_post2', { posts: allPosts });
                    break;
                case 'politics_body_post':
                    res.render('all_body_post3', { posts: allPosts });
                    break;
                case 'technology_box_post':
                    res.render('all_box_posts', { posts: allPosts });
                    break;
                case 'politics_hero_post':
                case 'daily_quote':
                    res.render('all_small_posts', { posts: allPosts });
                    break;
                case 'finance_slide_post':
                    res.render('all_slides', { posts: allPosts });
                    break;
                default:
                    res.status(400).json({ error: 'Invalid post type' });
            }
        } else {
            res.status(404).json({ error: 'Posts not found' });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

app.post('/sign_up', upload.single('image'), async (req, res) => {
    const { email, password, firstName, middleName, lastName } = req.body;

    try {
        if (req.file) {
            const readerExists = await Reader.findOne({ email: email });

            if (readerExists) {
                res.json({ error: true, message: 'Reader already exists' });
                console.log('Reader already exists');
            }

            const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

            const imageBuffer = req.file.buffer;

            const imageUrl = await handleImage(imageBuffer);

            let lastPost;
            let lastId = 0;

            lastPost = await Reader.find().sort({ id: -1 }).limit(1).exec();
            if (lastPost && lastPost.length > 0) {
                lastId = lastPost[0].id;
            }
            const id = lastId + 1;


            // Save the rest of the data to the database
            const reader = new Reader({
                id,
                email,
                password: hash,
                firstName,
                middleName,
                lastName,
                imageUrl: imageUrl,
            });

            try {
                await reader.save();

                //Set session values
                req.session.isAuthenticated = true;
                req.session.userRole = "reader";
                req.session.userId = reader._id.toString();
                req.session.firstName = reader.firstName;
                req.session.middleName = reader.middleName;
                req.session.lastName = reader.lastName;
                req.session.email = reader.email;
                req.session.imageUrl = reader.imageUrl;

                await new Promise((resolve, reject) => {
                    req.session.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                res.json({
                    success: true,
                    message: 'Reader created successfully',
                    isAuthenticated: req.session.isAuthenticated,
                    userRole: req.session.userRole,
                    id: req.session.userId,
                    firstName: req.session.firstName,
                    middleName: req.session.middleName,
                    lastName: req.session.lastName,
                    email: req.session.email,
                    imageUrl: req.session.imageUrl
                });
                console.log('Reader created successfully');
            } catch (saveError) {
                console.error('Error saving user to the database:', saveError);
                res.json({ error: true, message: 'Error saving user to the database' });
            }
        } else {
            // Handle the case where no image is provided
            res.json({ error: true, message: 'Image is required' });
        }
    } catch (error) {
        console.error('Error creating reader:', error);
        res.status(500).json({ error: 'Error creating reader' });
    }
});

// Route to fetch user data by user ID
app.get('/user_data', authenticate, authorize(['reader']), async (req, res) => {
    const { user_id } = req.query;

    try {
        // Fetch user data by ID, excluding the password
        const user = await Reader.findById(user_id).select('-password');

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Send user data as JSON response
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

app.post('/logout', authenticate, authorize(['reader']), async (req, res) => {
    try {
        // Destroy the session
        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log('session destroyed');

        res.json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error destroying session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/log_in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const reader = await Reader.findOne({ email: email });

        if (reader) {
            const passwordMatch = await bcrypt.compare(password, reader.password);
            if (passwordMatch) {

                //Set session values
                req.session.isAuthenticated = true;
                req.session.userRole = "reader";
                req.session.userId = reader._id.toString();
                req.session.firstName = reader.firstName;
                req.session.middleName = reader.middleName;
                req.session.lastName = reader.lastName;
                req.session.email = reader.email;
                req.session.imageUrl = reader.imageUrl;

                await new Promise((resolve, reject) => {
                    req.session.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                res.json({
                    success: true,
                    message: 'Reader created successfully',
                    isAuthenticated: req.session.isAuthenticated,
                    userRole: req.session.userRole,
                    id: req.session.userId,
                    firstName: req.session.firstName,
                    middleName: req.session.middleName,
                    lastName: req.session.lastName,
                    email: req.session.email,
                    imageUrl: req.session.imageUrl
                });
                console.log('Reader logged in successfully');
            } else {
                res.json({ error: true, message: 'Invalid password' });
                console.log('Invalid password');
            }
        } else {
            res.json({ error: true, message: 'Reader not found' });
            console.log('Reader not found');
        }
    } catch (error) {
        console.error('Error logging in reader:', error);
        res.json({ error: true, message: 'Error logging in reader' });
    }
});

// Route to increase likes count
app.post('/likes/increase/:postId/:tableName', authenticate, authorize(['reader']), async (req, res) => {
    const postId = req.params.postId;
    const postType = req.params.tableName;
    const user = req.body.user
    let post;

    try {
        switch (postType) {
            case 'my_journey_post':
                post = await My_journey_post.findById(postId);
                break;
            case 'finance_post':
                post = await Finance_post.findById(postId);
                break;
            case 'philosophy_post':
                post = await Philosophy_post.findById(postId);
                break;
            case 'science_post':
                post = await Science_post.findById(postId);
                break;
            case 'technology_post':
                post = await Technology_post.findById(postId);
                break;
            case 'art_post':
                post = await Art_post.findById(postId);
                break;
            case 'politics_post':
                post = await Politics_post.findById(postId);
                break;
            case 'daily_quote':
                post = await Daily_quote.findById(postId);
                break;
            case 'politics_hero_post':
                post = await Politics_hero_post.findById(postId);
                break;
            case 'finance_slide_post':
                post = await Finance_slide_post.findById(postId);
                break;
            case 'philosophy_article_post':
                post = await Philosophy_article_post.findById(postId);
                break;
            case 'science_article_post':
                post = await Science_article_post.findById(postId);
                break;
            case 'technology_body_post':
                post = await Technology_body_post.findById(postId);
                break;
            case 'technology_box_post':
                post = await Technology_box_post.findById(postId);
                break;
            case 'art_body_post':
                post = await Art_body_post.findById(postId);
                break;
            case 'politics_body_post':
                post = await Politics_body_post.findById(postId);
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (post) {
            post.likesCount++;
            post.likes.push(user);

            const updatedPost = await post.save();

            res.status(200).json({ success: true, message: 'Likes count increased successfully', updatedPost });
        }
    } catch (error) {
        console.error('Error updating likes count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to increase likes count
app.post('/likes/decrease/:postId/:tableName', authenticate, authorize(['reader']), async (req, res) => {
    const postId = req.params.postId;
    const postType = req.params.tableName;
    const user = req.body.user
    let post;

    try {
        switch (postType) {
            case 'my_journey_post':
                post = await My_journey_post.findById(postId);
                break;
            case 'finance_post':
                post = await Finance_post.findById(postId);
                break;
            case 'philosophy_post':
                post = await Philosophy_post.findById(postId);
                break;
            case 'science_post':
                post = await Science_post.findById(postId);
                break;
            case 'technology_post':
                post = await Technology_post.findById(postId);
                break;
            case 'art_post':
                post = await Art_post.findById(postId);
                break;
            case 'politics_post':
                post = await Politics_post.findById(postId);
                break;
            case 'daily_quote':
                post = await Daily_quote.findById(postId);
                break;
            case 'politics_hero_post':
                post = await Politics_hero_post.findById(postId);
                break;
            case 'finance_slide_post':
                post = await Finance_slide_post.findById(postId);
                break;
            case 'philosophy_article_post':
                post = await Philosophy_article_post.findById(postId);
                break;
            case 'science_article_post':
                post = await Science_article_post.findById(postId);
                break;
            case 'technology_body_post':
                post = await Technology_body_post.findById(postId);
                break;
            case 'technology_box_post':
                post = await Technology_box_post.findById(postId);
                break;
            case 'art_body_post':
                post = await Art_body_post.findById(postId);
                break;
            case 'politics_body_post':
                post = await Politics_body_post.findById(postId);
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (post) {
            post.likesCount--;
            const index = post.likes.findIndex((like) => like.userId === user.userId);
            if (index > -1) {
                post.likes.splice(index, 1);
            }

            const updatedPost = await post.save();

            res.status(200).json({ success: true, message: 'Likes count decreased successfully', updatedPost });
        }
    } catch (error) {
        console.error('Error updating likes count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/shares/:postId/:tableName', authenticate, authorize(['reader']), async (req, res) => {
    const postId = req.params.postId;
    const postType = req.params.tableName;
    const user = req.body.user
    let post;

    try {
        switch (postType) {
            case 'my_journey_post':
                post = await My_journey_post.findById(postId);
                break;
            case 'finance_post':
                post = await Finance_post.findById(postId);
                break;
            case 'philosophy_post':
                post = await Philosophy_post.findById(postId);
                break;
            case 'science_post':
                post = await Science_post.findById(postId);
                break;
            case 'technology_post':
                post = await Technology_post.findById(postId);
                break;
            case 'art_post':
                post = await Art_post.findById(postId);
                break;
            case 'politics_post':
                post = await Politics_post.findById(postId);
                break;
            case 'daily_quote':
                post = await Daily_quote.findById(postId);
                break;
            case 'politics_hero_post':
                post = await Politics_hero_post.findById(postId);
                break;
            case 'finance_slide_post':
                post = await Finance_slide_post.findById(postId);
                break;
            case 'philosophy_article_post':
                post = await Philosophy_article_post.findById(postId);
                break;
            case 'science_article_post':
                post = await Science_article_post.findById(postId);
                break;
            case 'technology_body_post':
                post = await Technology_body_post.findById(postId);
                break;
            case 'technology_box_post':
                post = await Technology_box_post.findById(postId);
                break;
            case 'art_body_post':
                post = await Art_body_post.findById(postId);
                break;
            case 'politics_body_post':
                post = await Politics_body_post.findById(postId);
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (post) {
            post.sharesCount++;
            post.shares.push(user);
            const updatedPost = await post.save();
            res.status(200).json({ success: true, message: 'Post shared successfully', updatedPost });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error sharing post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to increase likes count
app.post('/comments/add/:postId/:tableName', authenticate, authorize(['reader']), async (req, res) => {
    const postId = req.params.postId;
    const postType = req.params.tableName;
    const comment = req.body.comment;
    let post;

    try {
        switch (postType) {
            case 'my_journey_post':
                post = await My_journey_post.findById(postId);
                break;
            case 'finance_post':
                post = await Finance_post.findById(postId);
                break;
            case 'philosophy_post':
                post = await Philosophy_post.findById(postId);
                break;
            case 'science_post':
                post = await Science_post.findById(postId);
                break;
            case 'technology_post':
                post = await Technology_post.findById(postId);
                break;
            case 'art_post':
                post = await Art_post.findById(postId);
                break;
            case 'politics_post':
                post = await Politics_post.findById(postId);
                break;
            case 'daily_quote':
                post = await Daily_quote.findById(postId);
                break;
            case 'politics_hero_post':
                post = await Politics_hero_post.findById(postId);
                break;
            case 'finance_slide_post':
                post = await Finance_slide_post.findById(postId);
                break;
            case 'philosophy_article_post':
                post = await Philosophy_article_post.findById(postId);
                break;
            case 'science_article_post':
                post = await Science_article_post.findById(postId);
                break;
            case 'technology_body_post':
                post = await Technology_body_post.findById(postId);
                break;
            case 'technology_box_post':
                post = await Technology_box_post.findById(postId);
                break;
            case 'art_body_post':
                post = await Art_body_post.findById(postId);
                break;
            case 'politics_body_post':
                post = await Politics_body_post.findById(postId);
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (post) {
            post.comments.unshift(comment);
            post.commentsCount = post.comments.length;

            const updatedPost = await post.save();

            res.json({ success: true, updatedPost });
        }
    } catch (error) {
        console.error('Error updating commmets count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

