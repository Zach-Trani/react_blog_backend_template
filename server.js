const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// middleware - communicate between front/back ends
app.use(cors())
app.use(express.json())

// setup mongodb connection - using regular promises here instead of async/await
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch(error => console.log(err.message))

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

const Post = mongoose.model('Post', postSchema)

// controller 1 - get all posts
// handle get requests (use async when talking to db)
app.get('/posts', async (req,res) => {
    const posts = await Post.find()
    res.send(posts)
})

// controller 2 - get one post
app.get('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)
    res.send(post) //wrap up into object and send to client side
})

// controller 3 - create new post (take in data, run through blueprint, saved to db, send to front end)
app.post('/posts', async (req,res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.send(savedPost)
})

// controller 4 - delete post
app.delete('/posts/:id', async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Posted deleted')
})

app.listen(5500, () => console.log('Server started on port 5500'))