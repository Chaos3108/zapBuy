const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri =process.env.DB_URL;

MongoClient.connect(uri).then(()=>{
console.log("connected")
}).catch((e)=>{
    console.log("error in connecting the DB"+e)
})