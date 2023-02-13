'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const router = require('./router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router.router);

var port = process.env.PORT || 8010;
app.listen(port);
console.log('HTH API Send Mail is runnning at ' + port);