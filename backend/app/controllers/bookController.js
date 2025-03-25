const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  const {
    title,
    author,
    category,
    type,
    ISBN,
    publishedYear,
    availableCopies,
  } = req.body;

  try {
    const book = await Book.findOne({ title: title });
    if (book) {
      return res.status(401).json({ msg: "Book already exists." });
    }

    await Book.insertOne({
      title,
      author,
      category,
      type,
      publishedYear,
      ISBN,
      availableCopies,
    });

    res.status(201).json({ msg: "Book added with success" });
  } catch (error) {
    res.status(500).json({ msg: `Server error: ${error}` });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books: books });
  } catch (error) {
    res.status(500).json({ msg: `Server error: ${error}` });
  }
};

exports.getOneBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById({ _id: id });

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ msg: `Server error : ${error}` });
  }
};

exports.updateOneBook = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    author,
    category,
    type,
    ISBN,
    publishedYear,
    availableCopies,
  } = req.body;

  try {
    const book = await Book.findById({ _id: id });

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    const updatedBook = await Book.updateOne(
      { _id: id }, // condition
      { title, author, category, type, ISBN, publishedYear, availableCopies }
    );

    res.status(200).json({ msg: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: `Server error: ${error.message}` });
  }
};

exports.deleteOneBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById({ _id: id });

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await Book.deleteOne({ _id : id });

    res.status(200).json({ msg: "Book deleted with success" });
  } catch (error) {
    res.status(500).json({ msg: `Server error: ${error.message}` });
  }
};
