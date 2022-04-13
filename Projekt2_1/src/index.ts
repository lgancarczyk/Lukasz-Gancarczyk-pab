import {Request, Response} from 'express'
const express = require('express')  
const app = express()
const notes = require('./controllers/notesController')
const users = require('./controllers/usersController')

app.use(express.json())


app.use('/notes', notes)
app.use('/users', users)


app.listen(3000)

