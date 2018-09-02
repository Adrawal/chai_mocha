process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var bookModel = require('../../model/books')
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var cheerio = require('cheerio');
chai.use(chaiHttp);
var ejs = require('ejs');
supertest = require('supertest');
sinon = require('sinon');
//Our parent block
describe('Books', () => {
    beforeEach((done) => { 
        //Before each test we empty the database
        bookModel.remove({}, (err) => { 
           done();         
        });     
    });
});

// describe('/GET adminHome',() =>{
// it ('renders the index page', function(done) {
//    // var should = require('should');
//    // var cheerio = require('cheerio');
  
//     supertest(server)
//       .get('/adminHome')
//       .expect(200)
//       .end(function(err, res) {
//      //   err.should.not.be.ok();
//       //  res.should.be.ok();

//       console.log("ejs",res.body);
      
//         var $ = cheerio.load(res.body);
//         var header = $('h2:first');
//         header.should.equal('Hello');
      
//         done();
//       });
//   });
// });
describe('/POST updateBook',() => {
it('update data in the book db',function(){
    var bookdetails={
        bookName:"angels and Demon",
        author:"Dan Brown",
        price:"2340"
    }
    chai.request(server).post('/updateBook').send(bookdetails).end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
    })
})
})

describe('POST, addbook',()=>{
    it('add the new books details in the db',function(){
        var bookdetails={
            bookName:"mistress of the game",
            author:"sydney sheldon",
            price:"2140"
        }
        chai.request(server).post('/addDetails').send(bookdetails).end((err,resp)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })

    })
})
