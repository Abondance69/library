const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const {
  getAllBooks,
  createBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
} = require("../controllers/bookController");

router.post("/book", authMiddleware(), createBook);
router.get("/book/:id", authMiddleware(), getOneBook);
router.put("/book/:id", authMiddleware(), updateOneBook);
router.delete("/book/:id", authMiddleware(), deleteOneBook);
router.get("/books", getAllBooks);

module.exports = router;
