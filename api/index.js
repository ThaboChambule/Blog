const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

app.post('/register', (req,res)=>{
const {username,password} = req.body
res.json({requestData:{username,password}})


res.json('test ok2')

})
app.listen(8080)
//mongodb+srv://thabochambule1:5pMldKexTOvUqMO2@cluster0.qjlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



