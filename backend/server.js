const express = require("express");
const cors = require("cors");
const bodeParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./app/config/database");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodeParser.json());
app.use(express.json());
app.use(cookieParser());

const port = 8080;

// routes
app.use("/api", require("./app/routes/book"));
app.use("/api", require("./app/routes/user"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
