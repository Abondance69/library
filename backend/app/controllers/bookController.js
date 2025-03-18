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
    let book = await Book.findOne({ title: title });
    if (book) {
      return res.status(401).json({ msg: "Book already exists." });
    }

    book = await Book.insertOne({
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
    const {title} = req.param;
    console.log(title);
  
    try {
        const book = await Book.findOne({title : title});

        if(!book) {
            res.status(404).json({msg : "Book not found"});
        }

        res.status(200).json(book);
    
    }catch(error) {
        res.status(500).json({msg : `Server error : ${error}`});
    }
}