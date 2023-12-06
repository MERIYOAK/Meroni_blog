import express from 'express';

const crud = express();

crud.get("/crud", (req, res) => {
    try {
        res.render("crud");
    } catch (error) {
        console.error("Error rendering crud:", error);
        res.status(500).send("Error rendering crud.");
    }
})

export default crud