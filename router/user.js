const express=require('express')
const { request } = require('express')
const db=require('../db')
const utils=require('../utils')
const crypto = require('crypto-js');
const jwt=require('jsonwebtoken')
const config=require('../config')
const router=express.Router()

router.post('/login', (request, response) => {
    const { email, password } = request.body
    const statement = `select user_id, full_name,phone_no, is_delete from user where email = ? and password = ?`
    const encryptedPassword = String(crypto.SHA256(password))
    db.pool.query(statement, [email, encryptedPassword], (error, users) => {
      if (error) {
        response.send(utils.createErrorResult(error))
      } else {
        if (users.length == 0) {
          response.send(utils.createErrorResult('user does not exist'))
        } else {
          const user = users[0]
          if (user.isDeleted) {
            response.send(utils.createErrorResult('your account is closed'))
          } else {
            // create the payload
            const payload = { id: user.id }
            const token = jwt.sign(payload, config.secret)
            const userData = {
              token,
              name: `${user['full_name']}`,
            }
            response.send(utils.createSuccessResult(userData))
          }
        }
      }
    })
  })


  router.post('/register', (request, response) => {
    console.log('inside register')
    const {full_name,email,password ,phone_no} = request.body
    const statement = `insert into user (full_name,email,password ,phone_no) values (?, ?, ?, ?);`
    const encryptedPassword = String(crypto.SHA256(password))
    db.pool.execute(
      statement,
      [full_name,email,encryptedPassword ,phone_no],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })




module.exports=router

