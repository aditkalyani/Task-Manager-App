const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()

require('./db/mongoose.js') //handles the connection with mongoose

const User = require('./models/user.js') //our user model
const Task = require('./models/task.js') //our task model

const port = process.env.port || 3000

app.use(express.json()) //parses incoming json request to object

//******creating user
app.post('/users', (req, res)=>{
    const user = new User(req.body)
    
    user.save().then(()=>{
        console.log(user)
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//******creating task
app.post('/tasks',(req, res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//get all users
app.get('/users', (req,res)=>{
    User.find({}).then((users)=>{
        res.send(users) 
    }).catch(()=>{
        res.status(500).send()
    })
})

//get user by id
app.get('/users/:id', (req,res)=>{
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            res.status(404).send()
        }
    
        res.send(user)
    }).catch(()=>{
        res.status(500).send()
    })
})

app.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch(()=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        res.send(task)
    }).catch(()=>{
        res.status(404).send()
    })
})

app.listen(port, ()=>{
    console.log("Server is started at port "+ port)
})