const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        //Here the token is generated and pushed in the token array in the generateUserToken() function
        const token = await user.generateUserToken()

        await user.save() //password hashing logic would be handled here
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateUserToken()

        res.send({ user: user.getPublicProfileData(), token })
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.get('/users/me', auth, (req, res) => {
    res.send(req.user)
})

//get user by id

router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidOption = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOption) {
        return res.status(400).send("Error: No such field")
    }

    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update] //dynamically assigning the values coz update can be name, password, anything, thats why we cant use the req.body.name or something 
        })

        await req.user.save()

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;