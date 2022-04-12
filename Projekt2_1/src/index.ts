import {Request, Response} from 'express'
const express = require('express')  
const app = express()
const notes = require('./controllers/notesController')

app.use(express.json())


app.use('/notes', notes)


app.listen(3000)

