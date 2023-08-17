const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')

router.get("/", async (req, res) => {
    try {
        let data = await User.find({})
        res.send({ message: data })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }
})

router.post('/register', (req, res) => {
    const { name, email, password, age } = req.body
    if (!name || !email || !password || !age) {
        return res.status(422).json({ error: "fill completely" })
    }

    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" })
        }
        const user = new User({ name, email, password, age })
        user.save().then(() => {
            res.status(201).json({ message: "User successfully registered" })
        }).catch(() => {
            res.status(500).json({ error: "Failed to register" })
        })
    }).catch(err => { console.log(err) })
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ error: "fill completely" })
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            if (userLogin.password == password) {
                res.json({ message: "User Signin Successfully" })
            } else {
                res.json({ message: "Incorrect password" })
            }
        } else {
            res.status(422).json({ error: "Email not registered" })
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router