const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()

require('./db/mongoose.js') //handles the connection with mongoose

const User = require('./models/user.js') //our user model
const Task = require('./models/task.js') //our task model

const port = process.env.port || 3000

app.use(express.json()) //parses incoming json request to object

//******creating user
app.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
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

app.patch('/users/:id', async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidOption = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOption){
        return res.status(400).send("Error: No such field")
    }

    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch(e){
        res.status(400).send(e)
    } 
})

app.patch('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOption = updates.every(update => allowedUpdates.includes(update)) 

    if(!isValidOption){
        return res.status(400).send("Error: Not a valid field")
    }

    try{
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators:true})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    }catch(e){
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()  
        }

        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
    
})

app.delete('/tasks/:id', async (req,res)=>{
    
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    }catch(e){
        res.status(400).send(e)
    }


})

app.listen(port, ()=>{
    console.log("Server is started at port "+ port)
})