// =========================================
// Basic Node.js + Express.js Setup (Hindi Comments ke sath)
// =========================================

// Express ek framework hai jo server banane aur request handle karne me help karta hai
const express = require('express'); 
const app = express(); // yaha humne ek express application banaya hai

// Mongoose MongoDB se connect hone ke liye use hota hai (database connection)
const mongoose = require('mongoose');

// 'path' ek built-in Node.js module hai jo file paths ke sath kaam karta hai (folder/files locate karne ke liye)
const path = require('path');

// express-ejs-layouts ka use hum EJS template engine me layout (common header/footer) lagane ke liye karte hain
const expressLayouts = require('express-ejs-layouts');

// cookie-parser ka use browser ke cookies read/write karne ke liye hota hai (user session ya authentication me kaam aata hai)
const cookieParser = require('cookie-parser');

// connect-flash ka use temporary message (success/error) dikhane ke liye hota hai (jaise: “Login successful!”)
const flash = require('connect-flash');

// .env file me rakhe private data (jaise MongoDB URI, passwords, etc.) ko access karne ke liye
require('dotenv').config();


// =========================================
// MIDDLEWARES
// =========================================

// express.json() ka use JSON format data receive karne ke liye hota hai (POST request me)
// limit: '10mb' ka matlab hai ki 10MB tak ka data accept karega
app.use(express.json({ limit: '10mb' }));

// express.urlencoded() ka use HTML form ke data ko read karne ke liye hota hai (form ke input ko handle karta hai)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// express.static() ka use static files serve karne ke liye hota hai (jaise: CSS, JS, images)
// __dirname = current folder ka path, aur 'public' uska folder jahan static files rakhi hoti hain
app.use(express.static(path.join(__dirname, 'public')));

// cookieParser() ko use karne se hum cookies ko read aur set kar sakte hain
app.use(cookieParser());

// expressLayouts ka use EJS templates me common layout (header/footer/sidebar) lagane ke liye hota hai
app.use(expressLayouts);

// 'layout' default layout file set kar raha hai (layout.ejs)
app.set('layout', 'layout');


// =========================================
// VIEW ENGINE
// =========================================

// EJS (Embedded JavaScript) templating engine set kar rahe hain
// isse hum HTML pages me JavaScript code likh sakte hain
app.set('view engine', 'ejs');


// =========================================
// DATABASE CONNECTION
// =========================================

// Mongoose ke through MongoDB se connect karte hain
// process.env.MONGODB_URI ka value hum .env file me rakhte hain
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.log('❌ MongoDB connection error:', err));


// =========================================
// ROUTES
// =========================================

// Agar URL '/admin' se start hota hai to admin layout use karega
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin/layout'; // admin ke liye alag layout set
  next();
});

// /admin ke routes yaha se import ho rahe hain (routes/admin.js file se)
app.use('/admin', require('./routes/admin'));

// frontend ke routes (home, about, etc.) yaha se import ho rahe hain
app.use('/', require('./routes/frontend'));


// =========================================
// SERVER START
// =========================================

// PORT .env file se lega, agar waha nahi mila to default 5000 use karega
const port = process.env.PORT || 5000;

// Server ko start karne ke liye
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
