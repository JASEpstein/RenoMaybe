const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const passport = require("passport");

const dotenv = require("dotenv");

dotenv.config();

const users = require('./routes/api/users')

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require('./config/keys').MONGODB_URI;

mongoose.connect(
  process.env.MONGODB_URI || db, 
  {useNewUrlParser: true})
  
  .then(() => console.log("Mongoose Connected!!"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

//dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`🌎 App is listening on port ${port} !`));


