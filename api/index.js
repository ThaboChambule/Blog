const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const bcrypt = require('bcryptjs'); //This is encryption
const app = express();
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(10);
const secret = "ljsdljfsfslfsfslfsnfsnl";


//Middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())

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
jwt.sign({username, id:userDoc. id}, secret, {}, (err,token)=>{
    if(err) throw err;
    res.cookie('token', token).json('ok');
      id:userDoc._id,
      username

} )
    //res.json();

} else{
    res.status(400).json('wrong credentials')
}
})
app.get('/profile', (req,res)=>{
    const{token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        if(err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req,res) =>{
    res.cookie('token','').json('ok')
})

app.listen(8080);
