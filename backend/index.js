import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/api/v1", (req, res) => {
    res.send("<h1>Test...All Up & Running!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
});