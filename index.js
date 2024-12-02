const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const authRouter = require('./routes/authRoute');
const connectDB = require('./db');


app.listen(8000,function (){
    console.log('server running on '+ 8000)
});
app.get('/', function(req,res){
    res.send("Hello world")
})

app.use('/user',authRouter)
connectDB();






