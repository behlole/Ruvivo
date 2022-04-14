var express = require('express');
require('dotenv/config')
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect('mongodb://localhost:27017/ruvivo')

var userRoutes = require('./routes/userRoutes');
var authRoutes = require('./routes/authRoutes');

var app = express();
app.use(cors());
// view engine setup
app.use(express.json());

app.use('/', userRoutes);
app.use('/auth', authRoutes)
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.listen(3000, () => {
    console.log("Running...");
})
module.exports = app;
