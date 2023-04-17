const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/routes.js'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongoDB
require('./db/conn');

//routes
app.use(router);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});