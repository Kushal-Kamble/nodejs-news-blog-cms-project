// write a basic expressjs code with ejs view engine, mongoose connection, express-ejs-layouts, cookie-parser, connect-flash, dotenv for environment variables, json and urlencoded body parsing with a limit of 10mb, static files served from 'public' directory, and two route files: 'admin' and 'frontend'.

// app.js

// folders structure:

// modules  -> esme mongodb connection se related connection hogi

// routes   -> admin.js and frontend.js route files hongi

// views    -> ejs view files hongi / layouts hongi

// public   -> static files like css, js, fonts, images hongi

// utils    -> utility functions hongi  / code se related file bnayenge jisko hum alag alag files me use kr sakenge 

// middlewares -> custom middleware functions hongi jo request-response cycle me use hongi


// .env file me hum environment variables store karenge jaise MONGODB_URI, PORT etc.

// controllers -> business logic ko handle karne ke liye controllers hongi jo routes se call hongi

// models -> mongoose schemas and models hongi jo database interaction ke liye use hongi

// Now, here is the code for app.js

// app.js 

// uploads folder ko ignore karna hoga .gitignore me taaki wo version control me na jaye

// .gitignore file me /uploads ko add karna hoga

// .gitignore 

// uploads esme images and files store hongi jo user upload karega


// write a basic expressjs code 

// include mangose , path, express-ejs-layouts, cookie-parser, connect-flash, dotenv, connect-flash, express











// *****************************************************


// ===============================================
// write a basic expressjs code with ejs view engine,
// mongoose connection, express-ejs-layouts, cookie-parser,
// connect-flash, dotenv for environment variables,
// json and urlencoded body parsing with a limit of 10mb,
// static files served from 'public' directory,
// and two route files: 'admin' and 'frontend'.
// ===============================================


// ===============================================
// app.js
// ===============================================


// ===============================================
// Folder Structure Explanation (Detailed Hindi Version)
// ===============================================

// modules  -> 
//  Is folder me MongoDB se related connection file hogi.
//  Jaise ek dbConnect.js file jisme hum Mongoose ka connect code likhenge.
//  Ye alag folder rakhne se hum database connection ko clean aur reusable bana sakte hain.


// routes   -> 
//  Is folder me saare route files hongi, jaise:
//   - admin.js : admin panel ke routes (jaise /admin/dashboard, /admin/users)
//   - frontend.js : normal user ke routes (jaise /, /about, /contact)
//  Routes ka kaam hota hai — user ke request ko proper controller tak pahunchana.


// views    -> 
//  Ye folder EJS (Embedded JavaScript) view files ke liye hota hai.
//  Isme HTML pages ke jaise EJS templates hongi jisme hum dynamic data show karte hain.
//  Example:
//     - layout.ejs → common layout (header, footer, etc.)
//     - admin/layout.ejs → admin ka alag layout
//     - frontend/index.ejs → homepage ke liye template file


// public   -> 
//  Is folder me static files rakhe jaate hain jo browser directly access kar sakta hai.
//  Jaise CSS, JS, images, fonts, etc.
//  Example structure:
//     /public/css/style.css
//     /public/js/script.js
//     /public/images/logo.png
//  Is folder ko Express me static banana padta hai using:
//     app.use(express.static(path.join(__dirname, 'public')));


// utils    -> 
//  Utility functions ke liye folder hota hai — yaha hum reusable code likhte hain
//  jisko alag-alag files me import karke use kar sakte hain.
//  Example:
//     - emailSender.js (mail bhejne ke liye)
//     - generateToken.js (JWT ya random token generate karne ke liye)
//  Ye code ko modular aur maintainable banata hai.


// middlewares ->
//  Is folder me custom middleware functions rakhe jaate hain
//  jo Express ke request-response cycle me kaam karte hain.
//  Example:
//     - authMiddleware.js (user login check karne ke liye)
//     - loggerMiddleware.js (request log karne ke liye)
//  Middlewares se hum har request pe specific logic chala sakte hain,
//  bina har route me same code likhe.


// .env file ->
//  Ye file environment variables store karne ke liye hoti hai,
//  jisme sensitive data jaise passwords, API keys, aur MongoDB URI hota hai.
//  Example:
//     MONGODB_URI=mongodb+srv://username:password@cluster/test
//     PORT=5000
//     SECRET_KEY=mysecret123
//  Is file ko GitHub pe kabhi upload nahi karte (use .gitignore me ignore karte hain).


// controllers ->
//  Controllers ka kaam hota hai business logic handle karna.
//  Route file me hum bas request ko controller ke function tak pahuchate hain.
//  Example:
//     - userController.js → registerUser(), loginUser() functions
//     - productController.js → addProduct(), deleteProduct()
//  Isse code clean aur organized rehta hai.


// models ->
//  Is folder me Mongoose schemas aur models define kiye jaate hain.
//  Ye database ke table (collection) ka structure batata hai.
//  Example:
//     - User.js → user ka schema (name, email, password, etc.)
//     - Post.js → post ka schema (title, description, author)
//  Models ka use hum controllers me database operations ke liye karte hain.


// uploads ->
//  Ye folder user ke uploaded images ya files store karne ke liye hota hai.
//  Jaise profile pictures, documents, etc.
//  ⚠️ Important: is folder ko .gitignore me add karna chahiye,
//  taaki ye version control (GitHub) me upload na ho.


// .gitignore ->
//  Is file me hum un folders/files ke naam likhte hain
//  jo Git me commit nahi karne chahte.
//  Example:
//     node_modules/
//     .env
//     /uploads
//  Isse private aur heavy files commit hone se bach jaati hain.


// ===============================================
// Ab yaha likhenge actual app.js code
// ===============================================


// write a basic expressjs code 

// include express (server banane ke liye)
// include mongoose (MongoDB se connect hone ke liye)
// include path (file/folder paths handle karne ke liye)
// include express-ejs-layouts (EJS layouts use karne ke liye)
// include cookie-parser (cookies read/write karne ke liye)
// include connect-flash (temporary flash messages ke liye)
// include dotenv (environment variables ke liye)
// include express (JSON aur URL data parse karne ke liye)

// Ye sab modules ek basic Express project ke backbone hote hain
// jisse hum server setup, view render, aur database connection manage karte hain.
