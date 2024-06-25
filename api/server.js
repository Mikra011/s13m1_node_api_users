// BUILD YOUR SERVER HERE!
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: "The users information could not be retrieved"
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const createdUser = await User.insert({ name, bio })
            res.status(201).json(createdUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const updatedUser = await User.update(id, { name, bio })
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const removedUser = await User.remove(id)
        if (!removedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(removedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})


// EXPORT THE SERVER
module.exports = server; 
