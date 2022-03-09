const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  res.send('Hello World')  
})  
app.listen(3000) 

app.get('/:operation/:num1/:num2', function (req, res) {
    let operation = req.params.operation;
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    if(operation == 'add')
    {
        res.send((num1+num2).toString());
    }
    
});