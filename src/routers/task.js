const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks',(req, res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//get all users


router.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch(()=>{
        res.status(500).send()
    })
})

router.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        res.send(task)
    }).catch(()=>{
        res.status(404).send()
    })
})


router.patch('/tasks/:id', async (req,res)=>{
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



router.delete('/tasks/:id', async (req,res)=>{
    
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

module.exports = router;