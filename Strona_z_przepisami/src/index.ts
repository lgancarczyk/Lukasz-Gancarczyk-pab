import { dbmain } from "./services/DBContext"

const express = require('express')  
const recipe = require('./controllers/recipeController')

dbmain();
const app = express()

app.use(express.json())

app.use('/recipe', recipe)


app.listen(3000)