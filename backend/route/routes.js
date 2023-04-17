const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
router.get('/',(req,res)=>{
    res.send('This is home page from router');
});

//Create
router.post('/addData',async (req,res)=>{
    const {name, email, phone, work } = req.body;
    const user = new User({name, email, phone , work});

    try{
        await user.save();
        res.status(201).json({message: 'user data added successfully', status: '201'});
    } catch(err){
        console.log(err);
    }

});

//Read
router.get('/readData', async (req,res)=>{
    try{
        let data = await User.find({});
        res.json(data);
    } catch(err){
        console.log(err);
    }
});

//Update
router.put('/editData', async (req,res)=>{
    const {id,name, email, phone, work} = req.body;

    const editedData ={
        name: name, 
        email: email, 
        phone: phone, 
        work: work
    };

    try{
        const rs = await User.findByIdAndUpdate(id,editedData);
        if(!rs){
            res.status(400).message('Cant update')
        }
        //console.log('rs');
        console.log(rs);
        res.json(editedData);
    } catch(err){
        console.log(err);
    }
});

//Delete
router.delete('/deleteData/:id',async (req, res)=>{
    const id=req.params.id;
    console.log(id);
    try{
        await User.findByIdAndDelete(id);
        res.json({message: 'Delete successfull'});
    } catch(err){
        console.log(err);
    }
});

module.exports=router;