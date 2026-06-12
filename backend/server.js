const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");

const app= express(); //middleware
app.use(cors());
app.use(express.json());

//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log(err));

app.use('/api',authRoutes);
app.listen(5000,()=>{
    console.log('Server  running successfully');
});