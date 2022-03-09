var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(3000);
app.get('/:operation/:num1/:num2', function (req, res) {
    var operation = req.params.operation;
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    if (operation == 'add') {
        res.send((num1 + num2).toString());
    }
});
