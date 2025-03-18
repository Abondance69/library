const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: [
            "Roman", "Science-fiction", "Fantastique", "Horreur", "Poésie",
            "Histoire", "Philosophie", "Biographie", "Informatique", "Science",
            "Économie", "Politique", "Santé", "Psychologie", "Art", "Cuisine",
            "Voyage", "Bande dessinée", "Manga", "Développement personnel"
        ],
        required: true
    },
    type: {
        type: String,
        enum: ["Livre", "Magazine", "Article", "Ebook"],
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    availableCopies: {
        type: Number,
        default: 1,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Book", Book);