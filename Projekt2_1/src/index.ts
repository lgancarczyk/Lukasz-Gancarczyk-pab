import {Request, Response} from 'express'
import {main} from './services/dbcontext'
const express = require('express')  
const app = express()
const notes = require('./controllers/notesController')
const users = require('./controllers/usersController')

app.use(express.json())

main()
app.use('/notes', notes)
app.use('/users', users)


app.listen(3000)

