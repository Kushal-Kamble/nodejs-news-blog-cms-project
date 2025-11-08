/*🗂 Folder Structure — Node.js + Express + EJS Project

📁 project-setup.js
📁 .env
📁 app.js
📁 setup.js
📁 /modules
📁 /routes
   📁 admin.js
   📁 frontend.js
📁 /views
   📁 /layouts
📁 /public
   📁 /css
   📁 /js
   📁 /fonts
   📁 /images
📁 /utils
📁 /middlewares
📁 /controllers
📁 /models



************************************************************************

myapp/                          ← (Tera main project folder)
│
├── app.js                      ← Main server file (Express setup, routes connect, MongoDB connect)
│
├── .env                        ← Private data jaise MONGODB_URI, PORT, etc.
│
├── package.json                ← Project info + installed npm packages list
│
├── /routes                     ← Saare routes (URL handle karne wale files)
│   ├── admin.js                ← Admin ke liye routes (admin panel pages)
│   └── frontend.js             ← Normal user pages (home, about, contact, etc.)
│
├── /views                      ← EJS (HTML template) files rakhe jaate hain
│   ├── layout.ejs              ← Default layout (header + footer)
│   ├── /admin                  ← Admin pages (alag folder)
│   │   ├── layout.ejs          ← Admin-specific layout
│   │   └── dashboard.ejs       ← Example admin dashboard page
│   └── /frontend               ← Frontend pages (alag folder)
│       ├── index.ejs           ← Home page
│       └── about.ejs           ← About page
│
├── /public                     ← Static files (CSS, JS, Images)
│   ├── /css
│   │   └── style.css           ← Custom stylesheet
│   ├── /js
│   │   └── script.js           ← Custom JavaScript
│   └── /images
│       └── logo.png            ← Site images
│
└── /models                     ← MongoDB ke schema yaha define hote hain
    ├── User.js                 ← User model (login/register)
    └── Post.js                 ← Example post model

************************************************************************

📘 Short Hindi Explanation

Folder/File	Kaam
app.js	Yeh main entry file hai. Server start karta hai, middlewares lagata hai, aur routes connect karta hai.
.env	Isme sensitive info hoti hai (MongoDB link, password, secret keys). Yeh file GitHub pe upload nahi karte.
/routes	Yeh folder har page ke route define karta hai. Jaise /admin, /home, /contact etc.
/views	EJS files rakhe jaate hain jo HTML pages ke jaise hi hote hain par unme JS code likh sakte ho.
/public	Yeh folder browser me directly accessible files rakhta hai — jaise CSS, JS, aur images.
/models	MongoDB ke data structure (schema) define karne ke liye hota hai.


************************************************************************


⚙️ Example Flow Samajhne ke liye

➡ User browser me likhta hai:

http://localhost:5000/


➡ Ye request app.js → routes/frontend.js → views/frontend/index.ejs tak jaati hai.

➡ Agar user likhta hai:

http://localhost:5000/admin


To ye request app.js → routes/admin.js → views/admin/dashboard.ejs tak jaati hai.


************************************************************************
************************************************************************
************************************************************************
************************************************************************




*/