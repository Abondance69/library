const express = require("express");
const cors = require("cors");
const bodeParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./app/config/database");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodeParser.json());
app.use(express.json());

const port = 3000;

// routes
app.use("/api", require("./app/routes/index"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});