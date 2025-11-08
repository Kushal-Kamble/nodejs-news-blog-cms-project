// ============================================
// app.js
// ============================================
// Basic Express.js Project Setup with:
// → EJS View Engine
// → Mongoose (MongoDB connection)
// → express-ejs-layouts (layout system for EJS)
// → cookie-parser (for reading cookies)
// → connect-flash (for flash messages)
// → dotenv (for environment variables)
// → express.json & express.urlencoded (for form + JSON parsing)
// → Static files served from "public" folder
// → Routes for "admin" and "frontend"
// ============================================


// ===============================
// Required Modules
// ===============================
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('dotenv').config(); // .env file ke variables ko load karne ke liye


// ===============================
// Express App Initialize
// ===============================
const app = express();


// ===============================
// Middlewares
// ===============================

// JSON data (API ya AJAX ke data) ko parse karne ke liye
// limit: '10mb' ka matlab hai ki 10MB tak ka JSON data allow karega
app.use(express.json({ limit: '10mb' }));

// HTML form se data read karne ke liye (POST request form data)
// extended: true ka matlab hai nested objects bhi parse kar sakta hai
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files serve karne ke liye (CSS, JS, images)
// "public" folder ka content browser me directly accessible hota hai
app.use(express.static(path.join(__dirname, 'public')));

// Browser ke cookies ko read/write karne ke liye
app.use(cookieParser());

// Flash messages dikhane ke liye (success/error messages)
app.use(flash());

// EJS me layout use karne ke liye
app.use(expressLayouts);

// Default layout file set kar rahe hain
app.set('layout', 'layout');


// ===============================
// View Engine Setup
// ===============================

// EJS set kar rahe hain (ye template engine hai)
// Isse hum HTML + JavaScript ko combine kar sakte hain
app.set('view engine', 'ejs');


// ===============================
// Database Connection
// ===============================

// MongoDB connection mongoose ke through
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));


// ===============================
// Routes Setup
// ===============================

// Admin routes ke liye alag layout set karte hain
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin/layout'; // admin ke liye alag layout file
  next();
});

// Admin routes import
app.use('/admin', require('./routes/admin'));

// Frontend routes import
app.use('/', require('./routes/frontend'));


// ===============================
// Server Start
// ===============================

// Port .env file se lete hain, agar nahi mila to default 5000 use hoga
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});


// ============================================
// Folders / Files Explanation (Beginner Guide)
// ============================================

/*
📂 modules/
   → MongoDB se related connections aur helper files hongi
   (example: dbConnect.js file jisme mongoose.connect likha ho)

📂 routes/
   → admin.js → admin dashboard, users manage karne wale routes
   → frontend.js → website ke main pages (home, about, contact)

📂 views/
   → EJS view files hongi
   → layout.ejs → common header/footer
   → admin/layout.ejs → admin ka alag layout
   → frontend/index.ejs → main page

📂 public/
   → Static files (CSS, JS, fonts, images)
   → public/css/style.css
   → public/js/script.js
   → public/images/logo.png

📂 utils/
   → Utility/helper functions (common code)
   → Example: emailSender.js, generateToken.js

📂 middlewares/
   → Custom middlewares (auth check, logger, etc.)
   → Example: authMiddleware.js

📂 controllers/
   → Business logic handle karte hain (routes se call hote hain)
   → Example: userController.js me register/login ka logic

📂 models/
   → Mongoose schemas (MongoDB collection structure)
   → Example: User.js, Product.js

📂 uploads/
   → User uploaded files/images yaha store hongi
   ⚠️ Is folder ko .gitignore me add karna chahiye (because it’s temporary data)

📄 .env
   → Private environment variables
   Example:
       MONGODB_URI = mongodb+srv://username:password@cluster/test
       PORT = 5000
       SECRET_KEY = mysecret123

📄 .gitignore
   → Files/folders jo git me upload nahi karne
   Example:
       node_modules/
       /uploads
       .env
*/

// ============================================
// END
// ============================================
