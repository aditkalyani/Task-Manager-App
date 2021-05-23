const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()

require('./db/mongoose.js') //handles the connection with mongoose

const User = require('./models/user.js') //our user model
const Task = require('./models/task.js') //our task model

const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')

const port = process.env.port || 3000

app.use(express.json()) //parses incoming json request to object
app.use(userRoute)
app.use(taskRoute)

app.listen(port, ()=>{
    console.log("Server is started at port "+ port)
})