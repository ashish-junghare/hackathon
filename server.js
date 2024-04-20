const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const config=require('./config')

const utils=require('./utils')


// middleware to verify the token
app.use((request, response, next) => {
  // check if token is required for the API
  if (request.url === '/user/login' ||request.url === '/user/register' ||request.url.startsWith('/image/')) {
    // skip verifying the token
    next()
  } 
  else {
    // get the token
    const token = request.headers['token']

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult('missing token'))
    } 
    else {
      try {
        // verify the token
        const payload = jwt.verify(token, config.secret)

        // add the user Id to the request
        request.userId = payload['id']

        //TODO: expiry logic

        // call the real route
        next()
      } catch (ex) {
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
})



const userRouter=require('./router/user')
const categoryRouter=require('./router/category')

app.use('/user',userRouter)
app.use('/category',categoryRouter)


app.listen(4100, '0.0.0.0', () => {
  console.log('server started on port 4100')
})

