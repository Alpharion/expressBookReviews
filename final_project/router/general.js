const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users; // database of users
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  try {
    const {username, password} = req.body;
    let usercheck = users.filter((user) => user.username === username ? user : '');
    if (usercheck.length > 0) return res.json({message:`Username ${username} already taken!`})
    users.push({
      username: username,
      password: password
    })
    return res.send(`User ${username} created successfully!`).status(200)
    
  } catch (error) {
    return res.status(401).send({error});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let chosenBook = books[isbn];
  if (chosenBook) return res.status(200).send(chosenBook);
  return res.status(201).json({message: "No book with such isbn code exists."})
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let result = [];
  let keyList = Object.keys(books);
  for (let i=0; i<keyList.length; i++) {
    const tmp = books[keyList[i]];
    if (tmp.author === author) {
      result.push(tmp);
    }
  }
  if (result.length > 0)return res.send(result);
  return res.json({message: "No book with such author"})

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let result = [];
  let keyList = Object.keys(books);
  for (let i=0; i<keyList.length; i++) {
    const tmp = books[keyList[i]];
    if (tmp.title === title) {
      result.push(tmp);
    }
  }
  if (result.length > 0)return res.send(result);
  return res.json({message: "No book with such title"})

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let chosenBook = books[isbn];
  if (chosenBook) {return res.status(200).send(chosenBook.reviews);}
  return res.status(201).json({message: "No book with such isbn code exists."})
});

public_users.get('/test', (req, res) => {
  return res.send(JSON.stringify(users));
})

module.exports.general = public_users;
