var express = require('express');
var router = express.Router();
var User = require('../model/books')
var logger = require('../config/winston')


router.get('/adminHome', function(req, res, next) {
    logger.info("inside the admin home function 'req.query' ")
    console.log("Inside admin js",req.query)
    var doc="";
    var newsd=  JSON.stringify(doc)
    res.render('adminHome',{bookData:newsd});
    logger.info("after the page load  'res.body' ")
  });


  router.get('/fetchAdmin', function(req, res, next) {
      logger.debug("while fetching the Admin details 'req.query'")
      console.log("Fetch Admin")
      User.find(function(err,doc){
        if(err){
            console.log(err);
            res.status(500).send("Database Error")
        }else{
            console.log(doc);
          var newsd=  JSON.stringify(doc)
            res.render('adminHome',{bookData:doc});
        }
      })
   
  });


  router.post('/updateBook',function(req,res,next){
      console.log("Inside update book detais");
      logger.debug("inside the update request for books 'req.query'");
      var request = {bookName:req.body.bookName,
                     author:req.body.author,
                        price:req.body.price}
      User.findOneAndUpdate({_id:req.body.bookId},request,{upsert:true},function(err,doc){
        if (err) {
        return res.send(500, { error: err });
      }else{
        return res.send("succesfully Updated");
      }
      })

  })

  function updateBook(req){
    console.log("Inside update book detais",req);

  }


router.post('/addDetails', function(req, res, next) {


console.log(req.body)
    var book = new User();

    book.bookName=req.body.bookName;
    book.author=req.body.author;
    book.price=req.body.price;
    book.owner='admin';
    book.save(function(err,book){
        if(err){
            console.log(err)
            res.status(500).send("database Error");
        }else{
            res.send(book)
        }
    })

  });

 
  module.exports = router;


