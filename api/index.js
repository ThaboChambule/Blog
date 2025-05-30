const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const bcrypt = require("bcryptjs"); //This is encryption
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "ljsdljfsfslfsfslfsnfsnl";

//Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// Connecting to MongoDB with better error handling
// Try connecting to MongoDB Atlas first
mongoose
  .connect(
    "mongodb+srv://thabochambule1:5pMldKexTOvUqMO2@cluster0.qjlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB Atlas connection error:", err);
    console.log("Attempting to connect to local MongoDB instance...");

    // Try connecting to local MongoDB as fallback
    mongoose
      .connect("mongodb://localhost:27017/blog")
      .then(() => console.log("Connected to local MongoDB"))
      .catch((localErr) => {
        console.error("Local MongoDB connection error:", localErr);
        console.log(
          "Please check your MongoDB connection and network connectivity"
        );
      });
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await user.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body; //grab username and password from request body
  const userDoc = await user.findOne({ username });
  if (!userDoc) {
    return res.status(400).json("User not found");
  }
  const passOK = bcrypt.compareSync(password, userDoc.password);
  if (passOK) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(8080);
