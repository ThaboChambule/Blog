const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const bcrypt = require('bcryptjs'); //This is encryption
const app = express();

const salt = bcrypt.genSaltSync(10);


//Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://thabochambule1:5pMldKexTOvUqMO2@cluster0.qjlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try{
  const userDoc = await user.create({ 
    username,
     password:bcrypt.hashSync(password,salt),
    });
  res.json(userDoc);
  } catch(e){
    res.status(400).json(e);
  }
 
});
app.post('/login', async(req,res)=>{
const{username,password} = req.body //grab username and password from request body
const userDoc = await user.findOne({username});
const passOK = bcrypt.compareSync(password, userDoc.password);
if(passOK){
    //logged in
    
} else{
    res.status(400).json('wrong credentials')
}
})


app.listen(8080);
