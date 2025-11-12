const express = require('express');//express name ka variable banaya hai jisme express module ko import kiya hai
const router = express.Router();// router naam ka variable banaya hai jisme express ke router ko import kiya hai
const isLoggedIn = require('../middleware/isLoggedin'); // isLoggedIn naam ka variable banaya hai jisme isLoggedin middleware ko import kiya hai
const isAdmin = require('../middleware/isAdmin');//isadmin naam ka variable banaya hai jisme isAdmin middleware ko import kiya hai
const upload = require('../middleware/multer');// upload naam ka variable banaya hai jisme multer middleware ko import kiya hai
const isValid = require('../middleware/validation');//isvalid naam ka variable banaya hai jisme validation middleware ko

// IMPORT KIYA HAI

const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');
const UserController = require('../controllers/userController');

// IMPORT KIYA HAI 

//Login Routes
// routes means URL 
router.get('/', UserController.loginPage); // jaisehi koi login page ko call krega ye loginPage function call ho jayega controllers se
router.post('/index', isValid.loginValidation ,UserController.adminLogin); // jaisehi koi login page ko call krega ye adminLogin function call ho jayega controllers se
router.get('/logout',  isLoggedIn, UserController.logout); // jaisehi koi logout page ko call krega ye logout function call ho jayega controllers se
router.get('/dashboard', isLoggedIn, UserController.dashboard); // jaisehi koi dashboard page ko call krega ye dashboard function call ho jayega controllers se
router.get('/settings', isLoggedIn, isAdmin, UserController.settings);
router.post('/save-settings', isLoggedIn, isAdmin, upload.single('website_logo') ,UserController.saveSettings);

//User CRUD Routes
router.get('/users', isLoggedIn, isAdmin, UserController.allUser); // jaisehi koi users page ko call krega ye allUser function call ho jayega controllers se
router.get('/add-user', isLoggedIn, isAdmin, UserController.addUserPage); // sirf admin hi add-user page ko open kr skta hai isliye isme isAdmin middleware ka use kiya hai
router.post('/add-user', isLoggedIn, isAdmin,  isValid.userValidation ,UserController.addUser); //sirf admin hi add user kr skta hai isliye isme isAdmin middleware ka use kiya hai
router.get('/update-user/:id', isLoggedIn, isAdmin, UserController.updateUserPage); // user ko open krne ke liye maine  ye rounte ka use kiya hai 
router.post('/update-user/:id', isLoggedIn, isAdmin, isValid.userUpdateValidation , UserController.updateUser); // user ke data ko update krne ke liye ye route use kiya hai
router.delete('/delete-user/:id', isLoggedIn, isAdmin, UserController.deleteUser);

//Category CRUD Routes
router.get('/category', isLoggedIn, isAdmin, categoryController.allCategory);
router.get('/add-category', isLoggedIn, isAdmin, categoryController.addCategoryPage);
router.post('/add-category', isLoggedIn, isAdmin,  isValid.categoryValidation, categoryController.addCategory);
router.get('/update-category/:id', isLoggedIn, isAdmin, categoryController.updateCategoryPage); 
router.post('/update-category/:id', isLoggedIn, isAdmin,  isValid.categoryValidation, categoryController.updateCategory); 
router.delete('/delete-category/:id', isLoggedIn, isAdmin, categoryController.deleteCategory);

//Article CRUD Routes
router.get('/article', isLoggedIn, articleController.allArticle);
router.get('/add-article', isLoggedIn, articleController.addArticlePage);
router.post('/add-article', isLoggedIn, upload.single('image') ,isValid.articleValidation,articleController.addArticle);
router.get('/update-article/:id', isLoggedIn, articleController.updateArticlePage);
router.post('/update-article/:id', isLoggedIn, upload.single('image') ,isValid.articleValidation,articleController.updateArticle);
router.delete('/delete-article/:id', isLoggedIn, articleController.deleteArticle);

//Comment Routes
router.get('/comments', isLoggedIn, commentController.allComments);
router.put('/update-comment-status/:id', isLoggedIn, commentController.updateCommentStatus);
router.delete('/delete-comment/:id', isLoggedIn, commentController.deleteComment);

// 404 Middleware
// jab user aise page ki request krta hai jo page hai hi nhi  to ye middleware call hota hai
router.use(isLoggedIn,(req, res, next) => { // ye middleware tab call hoga jab koi aisa page request karega jo exist nhi krta
  res.status(404).render('admin/404',{// ye 404 page render kr dega
    message: 'Page not found',// ye message bhej dega
    role: req.role // ye konsa role hai vo bhej dega jaise admin ya user
  })
});

// 500 Error Handler
// jab server me koi error aata hai to ye middleware call hota hai
router.use(isLoggedIn, (err, req, res, next) => {  // ye middleware tab call hoga jab server me koi error aayega
  console.error(err.stack);// ye error ko console me print kr dega
  const status = err.status || 500;// ye status code ko set kr dega agar error me status code hai to vo use kr lega warna 500 use kr lega
  // convert this code into js switch case code
  let view;
  switch (status) {
    case 401:
      view = 'admin/401';// unauthorized error page means agar user ke pass access nhi hai to ye page dikhayega
      break;
    case 404:
      view = 'admin/404'; // page not found error page means agar page exist nhi krta to ye page dikhayega
      break;
    case 500:
      view = 'admin/500'; // internal server error page means agar server me koi error aata hai to ye page dikhayega
      break;
    default:
      view = 'admin/500';// default page internal server error page means agar koi aur error aata hai to ye page dikhayega
  }
  res.status(status).render(view,{ // ye page render kr dega
    message: err.message || 'Something went wrong', // ye error message bhej dega agar error me message hai to vo use kr lega warna 'Something went wrong' use kr lega
    role: req.role 
  })
});

module.exports = router;