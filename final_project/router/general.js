const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // Send the books array as the response to the client
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    // Send the isbn array as the response to the client
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // Create books by author array
    let bookauthor = []
    let isbns = Object.keys(books)
    // Search through books array and add to book author if found
    isbns.forEach((isbn) => {
        if (books[isbn]["author"] === req.params.author) {
            bookauthor.push({
                "number": isbn,
                "title": books[isbn]["title"],
                "reviews": books[isbn]["reviews"]
            });
        }
    });
    // Send the books by author array as the response to the client
    res.send(JSON.stringify({bookauthor}, null, 4))
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // Create books by title array
    let booktitle = []
    let isbns = Object.keys(books)
    // Search through books array and add to book title if found
    isbns.forEach((isbn) => {
        if (books[isbn]["title"] === req.params.title) {
            booktitle.push({
                "number": isbn,
                "author": books[isbn]["author"],
                "reviews": books[isbn]["reviews"]
            });
        }
    });
    // Send the books by author array as the response to the client
    res.send(JSON.stringify({booktitle}, null, 4))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const review = books[isbn]["reviews"]
    // Send the filtered_users array as the response to the client
    res.send(JSON.stringify({review}, null, 4));
});

module.exports.general = public_users;
