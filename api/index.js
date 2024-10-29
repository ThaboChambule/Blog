const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://thabochambule1:5pMldKexTOvUqMO2@cluster0.qjlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try{
  const userDoc = await user.create({ username, password });
  res.json(userDoc);
  } catch(e){
    res.status(400).json(e);
  }
 
});

app.listen(8080);
