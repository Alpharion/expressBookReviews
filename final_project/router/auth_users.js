const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  let user = users.filter((iter) => {
    return iter.username === username;
  })
  if (user) return true;
  return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let validUser = users.filter((user) => {
    return (user.username === username && user.password === password)
  })
  if(validUser) return true;
  return false;
}



//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  jwt.sign({user:user}, 'secretkey', (err, token) => {
    res.json({token})
  })
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    books[isbn].reviews.push({
      user: req.user,
      mssg: req.body.message
    })
    return res.json({message: "review added"})
  }
  else return res.json({message: "no such book"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
