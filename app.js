const express = require('express');// yhape maine express nam ka variable bnaya hai jo ki use kr rha hai express naaam ke package ko
const app = express(); // yhape maine app nam ka variable bnaya hai jo ki use kr rha hai express naaam ke package ko
const mongoose = require('mongoose'); // yhape maine mongoose nam ka variable bnaya hai jo ki use kr rha hai mongoose naaam ke package ko
const path = require('path');// yhape maine path nam ka variable bnaya hai jo ki use kr rha hai  path naaam ke package ko
const expressLayouts = require('express-ejs-layouts'); // yhape maine expressLayouts nam ka variable bnaya hai jo ki use kr rha hai  express-ejs-layouts naaam ke package ko
const cookieParser = require('cookie-parser'); // yhape maine ccookieParser nam ka variable bnaya hai jo ki use kr rha hai  cookie-parser naaam ke package ko
const flash = require('connect-flash'); // yhape maine flash nam ka variable bnaya hai jo ki use kr rha hai connect-flash naaam ke package ko
require('dotenv').config();// yhape maine dotenv nam ka variable bnaya hai jo ki use kr rha hai dotenv naaam ke package ko


// Middleware
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public'))); // jitni bhi sttaic file hai o public folder ke andar hai
app.use(cookieParser());// cookie parser middleware ko use kr rha hai
app.use(expressLayouts);
app.set('layout','layout')

// View Engine
app.set('view engine', 'ejs');

//Database Connection
mongoose.connect(process.env.MONGODB_URI)

// Routes
app.use('/admin',(req, res, next) =>{
  res.locals.layout ='admin/layout';
  next();
})
app.use('/admin', require('./routes/admin'));

app.use('/', require('./routes/frontend'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// https://windsurf.com/profile
