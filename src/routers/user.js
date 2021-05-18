const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', (req,res)=>{
    User.find({}).then((users)=>{
        res.send(users) 
    }).catch(()=>{
        res.status(500).send()
    })
})

//get user by id
router.get('/users/:id', (req,res)=>{
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

router.patch('/users/:id', async (req,res)=>{
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

router.delete('/users/:id', async (req,res)=>{
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

module.exports = router;