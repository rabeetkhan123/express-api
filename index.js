const express = require('express')
const mongoose = require('mongoose');

const app = express()
const uri = "mongodb+srv://rabeetkhan2005:test123@cluster0.rcfz529.mongodb.net/backend_db?retryWrites=true&w=majority"

app.use(express.json());
const product = require('./api/product')

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => console.log("Error in connection"))

const PORT = process.env.PORT || 5050

app.use("/api/product", product)

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

