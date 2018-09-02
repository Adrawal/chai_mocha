var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = mongoose.Schema;
var userSchema = new schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
userSchema.methods.hashPassword = function(password){
return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function(password,hash){
 console.log("In compare Password")
    return bcrypt.compareSync(password,hash);
    }
module.exports =mongoose.model('User',userSchema,'user');