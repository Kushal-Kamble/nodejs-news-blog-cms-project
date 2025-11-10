const bcrypt = require('bcryptjs') // password ko hash krne ke liye
const jwt = require('jsonwebtoken')// token generate krne ke liye
const dotenv = require('dotenv')// environment variables ko use krne ke liye
const { validationResult } = require('express-validator')// validation ke liye
const userModel = require('../models/User');// user model ko import kiya hai
const newsModel = require('../models/News');// news model ko import kiya hai
const categoryModel = require('../models/Category');// category model ko import kiya hai
const settingModel = require('../models/Setting');// setting model ko import kiya hai
const createError = require('../utils/error-message')// custom error message ke liye
const fs = require('fs')// file system module for handling file operations

dotenv.config() // environment variables ko load krne ke liye

// login krne ke baad me bcrypt se match krunga pass ko  jab pass match ho jaata hai me ek token generate krunga jwt se aur us token ko cookie me store kr dunga taaki user ko authenticate kr saku

const loginPage = async (req,res) => {
  res.render('admin/login',{// login page ko render kr dega
    layout: false,// layout false kr dena taaki koi layout na lage
    errors: 0
  })
 }

const adminLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    return res.render('admin/login',{
      layout: false,
      errors: errors.array()
    })
  }

  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return next(createError('Invalid username or password', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return next(createError('Invalid username or password', 401));
    }

    const jwtData = { id: user._id, fullname: user.fullname, role: user.role }
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.redirect('/admin/dashboard');
  } catch (error) {
    next(error)
  }
};

const logout = async (req,res) => {
  res.clearCookie('token')
  res.redirect('/admin/')
 }

const dashboard = async (req, res,next) => {
  try {
    let articleCount;
    if(req.role == 'author'){
      articleCount = await newsModel.countDocuments({ author: req.id });
    }else{
      articleCount = await newsModel.countDocuments();
    }
   
    const categoryCount = await categoryModel.countDocuments();
    const userCount = await userModel.countDocuments();

    res.render('admin/dashboard', { 
      role: req.role, 
      fullname: req.fullname,
      articleCount,
      categoryCount,
      userCount 
    });
  } catch (error) {
    next(error)
  }
}


const settings = async (req,res,next) => { 
  try {
    const settings = await settingModel.findOne()
    res.render('admin/settings', { role: req.role , settings})
  } catch (error) {
    next(error)
  }
}

const saveSettings = async (req, res, next) => {
  const { website_title, footer_description } = req.body;
  const website_logo = req.file?.filename;

  try {
    let setting = await settingModel.findOne();
    if(!setting){
      setting = new settingModel();
    }
    setting.website_title = website_title;
    setting.footer_description = footer_description;

    if(website_logo){
      if(setting.website_logo){
        const logoPath = `./public/uploads/${setting.website_logo}`;
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
      }
      setting.website_logo = website_logo;
    }

    await setting.save();
    res.redirect('/admin/settings');
  } catch (error) {
    next(error)
  }
  
}

const allUser = async (req,res) => { 
  const users = await userModel.find()  // sara data aa jayega
  res.render('admin/users', { users, role: req.role })  // aur es page me dikh jayega
}
const addUserPage = async (req,res) => {
  res.render('admin/users/create' , { role: req.role, errors: 0 }) // ye add user page ko render kr dega
 }

const addUser = async (req,res) => { // write a code for add user
  const errors = validationResult(req); 
   if (!errors.isEmpty()) {
    return res.render('admin/users/create',{
      role: req.role, // ye role bhej dena taaki navbar me dikhe
      errors: errors.array() // aur errors bhi show kr dena
    })
  }
  await userModel.create(req.body) // form se yha data milega
  res.redirect('/admin/users')
}

const updateUserPage = async (req,res,next) => {
  // prompt i want to fetch user data by id and show in update form
  //  i want to get the data of the user to edit get the data with id in url bar
  //  put this code in try and catch method
  const id = req.params.id // sabse pehle maine id get ki hai parameters se jo id url me hoga wo milega
  try {
    const user = await userModel.findById(id) // us id se data milega 
    // data user name ke variable me ajayega
    if(!user){ // agar user na mile to
      return next(createError('User not found', 404)); // error message show kr dena
    }
    res.render('admin/users/update', { user , role:req.role, errors:0 }) // us data ko update page me bhej dena 
  } catch (error) { // agar error aata hai to
    next(error)
  }
  
 }

const updateUser = async (req,res,next) => {
  // write a code for update user data by id
  const id = req.params.id // sabse pehle maine id get ki hai parameters se jo id url me hoga wo milega

  const errors = validationResult(req); 
   if (!errors.isEmpty()) {
    return res.render('admin/users/update',{
      user:req.body,
      role: req.role,
      errors: errors.array()
    })
  }
  const { fullname, password, role } = req.body // req.body se form se data milega jinka data hume change krna hai
  try {
    const user = await userModel.findById(id) // us id se data milega
    if(!user){ // agar user na mile to
      return next(createError('User not found', 404));
    }

    user.fullname = fullname || user.fullname // agar fullname hai to fullname me daal dena warna purana hi rahega
    if(password){ // agar password hai to
      user.password = password
    }
    
    user.role = role || user.role // agar role hai to role me daal dena warna purana hi rahega
    await user.save() // us user ko save kr dena

    res.redirect('/admin/users') // aur uske baad user page pe chala jayega
  } catch (error) {
    next(error)// agar error aata hai to
  }
  
}
 

const deleteUser = async (req,res,next) => {
  const id = req.params.id // sabse pehle maine id get ki hai parameters se jo id url me hoga wo milega
  try {
    const user = await userModel.findById(id) // us id se data milega
    if(!user){ // agar user na mile to
      return next(createError('User not found', 404)); // error message show kr dena
    }
     
    const article = await newsModel.findOne({ author: id }); // check if user is associated with any article
    if (article) { // agar user kisi article se associated hai to
      return res.status(400).json({ success: false, message: 'User is associated with an article' }); // error message show kr dena
    }

    await user.deleteOne()// us user ko delete kr dena
    res.json({success:true})// aur json me success message show kr dena
  } catch (error) {// agar error aata hai to
    next(error)// agar error aata hai to
  }
}
// export all functions
// ye sb functions ko export kr dena hai taaki route me use kr ske
module.exports = { 
  loginPage, 
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  dashboard,
  settings,
  saveSettings
}