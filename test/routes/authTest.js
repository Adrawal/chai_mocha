process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var bookModel = require('../../model/books')
var User = require('../../model/User')
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var cheerio = require('cheerio');
chai.use(chaiHttp);
var ejs = require('ejs');
supertest = require('supertest');
sinon = require('sinon');

describe('Student', () => {
    beforeEach((done) => { 
        //Before each test we empty the database
        bookModel.remove({}, (err) => { 
           done();         
        });     
    });
});

describe('POST SignUp Page',()=>{

    it('add new user in db',function(){

        var records = {
            userName:"sam",
            firstName:"samueal",
            lastName:"Jackson",
            email:"sam12@gmail.com",
            role:"admin",
            password:"sam@123"
        }
        chai.request(server).post('/signUp').send(records).end((err,res)=>{
            res.should.have.status(200);
        res.body.should.be.a('object');
        done();
        });
    });

});

describe('POST to login page',()=>{
    it('to login on the page ',()=>{

        chai.request(server).post('/login').send().end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();

        })
    })
})