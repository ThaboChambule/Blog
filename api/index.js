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
