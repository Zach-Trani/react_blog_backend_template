const express = require('express')
const mongoose = mongoose('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// middleware - communicate between front/back ends
app.use(cors())
app.use(express.json())

// setup mongodb connection - using regular promises here instead of async/await
mongoose.connection(process.env.MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch(error => console.log(err.message))

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

const Post = mongoose.model('Post', postSchema)

// get all posts
// get one post
// create new post
// delete post