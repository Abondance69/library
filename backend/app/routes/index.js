const express = require('express');

const router = express.Router();

const { getAllBooks, createBook, getOneBook } = require("../controllers/bookController");

router.post("/book", createBook);
router.get("/book/:title", getOneBook);
router.get("/books", getAllBooks);

module.exports = router;