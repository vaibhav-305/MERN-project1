const mongoose = require('mongoose');

const DB='mongodb+srv://Vaibhav:brainss101@cluster0.gakr2.mongodb.net/CRUD1?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log(`connection successfull`)
}).catch((err)=> console.log(`no connection`));