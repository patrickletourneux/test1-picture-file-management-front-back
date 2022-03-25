
require('dotenv').config();

var express = require('express')

const router = require('./app/router');
var port = 3000;

var app = express()



app.use(express.static(__dirname + '/public'));

app.use(router);
// middleware upload pour capturer le buffer de l image
   

app.listen(port,() => console.log(`Server running on port ${port}!`))
