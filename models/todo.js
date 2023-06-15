const mongoose = require('mongoose');

const todoSchema =new mongoose.Schema({
    task:{
        type:String,
        required:true        
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

const todo = mongoose.model('todo',todoSchema);          // this will contain collection of all the database and it is called collection
module.exports=todo;