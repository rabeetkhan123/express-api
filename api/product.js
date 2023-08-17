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

module.exports = router