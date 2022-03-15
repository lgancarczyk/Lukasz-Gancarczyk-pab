const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  res.send('Hello World')  
})  
app.listen(3000) 

app.get('/:operator/:num1/:num2', function (req, res) {
    let operator = req.params.operator;
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    if(operator == 'add')
    {
        res.send((num1+num2).toString());
    }
    else if(operator =='substract')
    {
        res.send((num1-num2).toString());
    }
    else if(operator =='divide')
    {
        res.send((num1/num2).toString());
    }
    else if(operator =='multiply')
    {
        res.send((num1*num2).toString());
    }
    else
    {
      res.send('Wrong command. Commands(add, substract, divide, multiply/num1/num2)')
    }
});