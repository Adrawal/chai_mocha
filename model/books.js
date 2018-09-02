var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bookSchema = new schema({
    bookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }, 
    owner:{
        type:String,
        required:false
    }
})

module.exports =mongoose.model('Book',bookSchema,'book');