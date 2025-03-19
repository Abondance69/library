const express = require("express");

const router = express.Router();

const {
  getAllBooks,
  createBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
} = require("../controllers/bookController");

router.post("/book", createBook);
router.get("/book/:title", getOneBook);
router.put("/book/:title", updateOneBook);
router.delete("/book/:title", deleteOneBook);
router.get("/books", getAllBooks);

module.exports = router;
