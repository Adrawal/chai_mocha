var express = require('express');
var router = express.Router();
var User = require('../model/User');
var bookModel = require('../model/books');
var studentModel = require('../model/studentModel')
var SqlString = require('sqlstring');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


router.get('/studentHome', function(req, res, next) {
    console.log("Inside the student Js ",req.user);
    var checkResp = isStudentExist(req.user);
    var checkoutBooksresp = checkoutBooks(req.user.userName);
    var newsd=  JSON.stringify(checkoutBooksresp);
    var news=  JSON.stringify(checkResp);

    var loadAllbookHere = loadAllBooks(req.user,checkoutBooksresp,res );

   
  });



  var isStudentExist = function isStudentExist(user){
      console.log("inside the studentExist Function",user);
    studentModel.pool.getConnection(function(err,response){
        if(err){
            console.log("SQL database connection Issue");
            console.log(err)

            throw err;
        }else{
            var query =  SqlString.format('Select * from studentInfo where username = ?' ,[user.userName]);
            response.query(query,function(error,results,field){

                if(err){
                    console.log("SQL database retriving Issue");
                    console.log(err)  
                    throw err;
                }else{
                    console.log("1st else block")
                    if(!isEmptyObject(results)){
                       console.log("1st if condition");
                       console.log(results);
                       return results; 
                       
                    }else{
                        console.log("2nd else block")
                        var insert= SqlString.format("INSERT INTO studentInfo (username,firstName,lastName) VALUES (?,?,?)",[user.userName,user.firstName,user.lastName]);
                        console.log("while Inserting ",insert)
                        response.query(insert,function(error,result,fields){
                            response.release();
                            if(err) throw err;
                            console.log(result);
                            return result;
                        })


                    }

               
            }
            })
        }
    })
    
   


  }

  var checkoutBooks = function checkoutBooks(userName){

    console.log("Inside the checkout books Function ")
        studentModel.pool.getConnection(function(err,response){
            if(err){
                console.log("SQL database connection Issue");
                console.log(err)
    
                throw err;
            }else{
                var studentCheckoutsQuery= SqlString.format("select * from books where owner = ? And checkout = ?",([userName,true]))
                response.query(studentCheckoutsQuery,function(error,result,fields){
                   
                            if(err) throw err;
                            console.log(result);
                            response.release();
                            return result;
                });
            }

        })
    



  }

function loadAllBooks(user, checkoutBooksresp,res){
    var booksLoad="";
    console.log("Inside the loadAll books ")
    bookModel.find(function(err,resp){
        if(err){
            console.log(err);
            resp.status(500).send("Database Error");
            return "false";
        }else{
            console.log(resp)
            booksLoad = resp;
            renderBooksOnPage(booksLoad, user, checkoutBooksresp,res)
        }
      })
  
      return booksLoad;
}

function renderBooksOnPage(loadBooksHere, user, checkoutBooksresp,res) {
    
        console.log("I am also here ",loadBooksHere);
         res.render('student',{student:user, booksAvailable:checkoutBooksresp, allBooks:loadBooksHere});
}


router.post('/takeBook', function(req, res, next) {

    console.log("inside the take book function",req.body);





});


  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }



module.exports = router;


