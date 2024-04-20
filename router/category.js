const express=require('express')
const { request } = require('express')
const db=require('../db')
const utils=require('../utils')
const crypto = require('crypto-js');
const jwt=require('jsonwebtoken')
const config=require('../config')
const router=express.Router()


router.post('/addCategory',(request,response)=>{
  const {title,description} = request.body
  statement='insert into category (title,description) values(?,?);'
  db.pool.execute(statement,[title,description],(error,result)=>{
    response.send(utils.createResult(error,result))
  })

})




module.exports=router

