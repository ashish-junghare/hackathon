const express=require('express')
const { request } = require('express')
const db=require('../db')
const utils=require('../utils')
const jwt=require('jsonwebtoken')
const config=require('../config')
const router=express.Router()


router.get('/allBlog',(request,response)=>{
  statement='select blog.blog_id,blog.title "blog_title",category.title"category_title" from blog,category where blog.category_id=category.category_id and blog.is_delete=0 and category.is_delete=0;'
  db.pool.execute(statement,(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

router.get('/userblog',(request,response)=>{
  statement='select blog.blog_id,blog.title"blog_title",category.title "category_title"from blog,category where blog.category_id=category.category_id and blog.is_delete=0 and category.is_delete=0 and user_id=?;'
  db.pool.execute(statement,[request.userId],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

router.put('/deleteblog',(request,response)=>{
  const {blog_id}=request.body
  statement='update blog set is_delete=1 where blog_id=?;'
  db.pool.execute(statement,[blog_id],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

router.post('/createblog',(request,response)=>{
  const{title,content,category_id}=request.body
  statement='insert into blog (title,content,user_id,category_id) values(?,?,?,?);'
   db.pool.execute(statement,[title,content,request.userId ,category_id],(error,result)=>{
     response.send(utils.createResult(error,result))
   })
})

router.post('/blogview',(request,response)=>{
  const{blog_id}=request.body
  statement='select title,content from blog where blog_id=?;'
  db.pool.execute(statement,[blog_id],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

router.post('/findBlog',(request,response)=>{
  const{title}=request.body
  statement='select blog.blog_id,blog.title"blog_title",category.title "category_title",blog.created_time from blog,category where blog.category_id=category.category_id and blog.is_delete=0 and category.is_delete=0 and blog.title=?;'
  db.pool.execute(statement,[title],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})




module.exports=router

