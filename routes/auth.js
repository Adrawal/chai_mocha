var express = require('express');
var router = express.Router();
var User = require('../model/User')


router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = function(passport){

    router.post('/signUp', function(req, res, next) {
    
    var body = req.body,
    userName= body.userName,
    password = body.password,
    role = body.role,
    email= body.email,
    firstName = body.firstName,
    lastName = body.lastName;
    console.log(body);
    User.findOne({userName:userName},function(err,doc){
        if(err){res.status(500).send("error Occured")}
        else{
            if(doc){
                {res.status(500).send("UserName is already exists")} 
            }else{
                var record = new User()
                record.userName=userName;
                record.password=record.hashPassword(password)
                record.email=email;
                record.role=role;
                record.firstName=firstName;
                record.lastName=lastName;
                record.save(function(err,user){
                   if(err){
                       console.log(err)
                       res.status(500).send("database error")
                   } else{
                       res.send(user);
                   }
                })

            }
        }
    })
    
    });


  /**  router.post('/loginUser',function(req, res, next){
        console.log(req.body);
    })**/

    router.post('/loginUser',passport.authenticate('local',{
        failureRedirect:'/login',
        successRedirect:'/profile'
    }),function(req,res){
        res.send("Hey");
    })
      return router;
    
}