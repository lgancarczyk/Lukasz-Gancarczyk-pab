import { dbmain } from "./services/DBContext"

const express = require('express')  
const recipe = require('./controllers/recipeController')
const user = require('./controllers/userController')


dbmain();
const app = express()

app.use(express.json())

app.use('/recipe', recipe)
app.use('/user', user)


app.listen(3000)