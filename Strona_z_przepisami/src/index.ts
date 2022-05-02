const express = require('express')  
const recipe = require('./controllers/recipeController')


const app = express()

app.use(express.json())

app.use('/recipe', recipe)


app.listen(3000)