const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated; //login route
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());



app.use("/customer/auth/*", (req,res) => {
//Write the authenication mechanism here
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if (token == null) return res.send(401);

jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403);
    req.user = user;
})

});
 
const PORT =5000;

app.use("/customer", customer_routes); //login route
app.use("/", genl_routes); //public user

app.listen(PORT,()=>console.log("Server is running"));


