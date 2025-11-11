const categoryModel = require('../models/Category'); //categoryModel sirf variable ka naam hai jisme tumne wo exported model store kiya.
const newsModel = require('../models/News')
const createError = require('../utils/error-message')
const { validationResult } = require('express-validator')

const allCategory = async (req,res) => { 
  // write a code to add new category data
  const categories = await categoryModel.find()
  res.render('admin/categories' , { categories, role: req.role })
}
const addCategoryPage = async (req,res) => {
  res.render('admin/categories/create', { role: req.role, errors:0 })
 }

const addCategory = async (req,res) => { 
  const errors = validationResult(req); 
     if (!errors.isEmpty()) {
      return res.render('admin/categories/create',{
        role: req.role,
        errors: errors.array()
      })
    }

  try {
    await categoryModel.create(req.body) // ye req.body me jo bhi data hoga vo category model me chala jayega // body se jo data aa rha hai use me create  kr rha hoo
    res.redirect('/admin/category'); // uske baad me admin/category page pe redirect kr dunga
  } catch (error) {
    res.status(500).send(error);
  }
}

const updateCategoryPage = async (req,res,next) => { 
  // write a code to get category and fetch all data to send update page
  const id = req.params.id; // ye id me se category id ko le rha hoo
  try {
    const category = await categoryModel.findById(id); // ye id se category ko find kr rha hoo
    if(!category){
      return next(createError('Category not found', 404));
    }
    res.render('admin/categories/update', { category, role: req.role, errors: 0 })
  } catch (error) {
    // res.status(400).send(error);
    // put this code try and catch method me taaki error handle ho jaye
    next(error)
  }
}

const updateCategory = async (req,res,next) => { // ye category ko update krne ke liye hai
  const id = req.params.id;// ye id me se category id ko le rha hoo hume params se id leni hai

  const errors = validationResult(req); // ye validationResult me se errors ko le rha hoo
     if (!errors.isEmpty()) {
      const category = await categoryModel.findById(id)// ye id se category ko find kr rha hoo
      return res.render('admin/categories/update',{
        category,
        role: req.role,
        errors: errors.array()
      })
    }
  try {
    const category = await categoryModel.findById(id); // categoryModel se id ke through category ko find kr rha hoo
    if (!category) {
      return next(createError('Category not found', 404));
    }

    category.name = req.body.name;
    category.description = req.body.description;

    await category.save();
    res.redirect('/admin/category');
  } catch (error) {
    // res.status(400).send(error);
    next(error)
  }
 }

// 🧠 Category delete karne wala controller function
// Ye function async hai, matlab ye database se data lene / delete karne me "await" ka use karega
const deleteCategory = async (req, res, next) => {

  // 🪄 Step 1: URL se category ka id nikalna
  // Example: agar request aayi "/admin/delete-category/6742ab9..." to ye id mil jayegi
  const id = req.params.id;

  try {
    // 🪄 Step 2: Pehle check karo ki category exist karti hai ya nahi
    // Agar database me category milti hai to "category" variable me aa jayegi
    const category = await categoryModel.findById(id);

    // Agar category nahi mili to error return karo
    if (!category) {
      // createError ek custom error generator hai (ye Express ke error middleware me chala jayega)
      return next(createError('Category not found', 404));
    }

    // 🪄 Step 3: Check karo kya koi news/article to is category se linked to nahi hai
    // Kyunki agar koi article "Sports" category me hai, to category delete nahi karni chahiye
    const article = await newsModel.findOne({ category: id });

    // Agar koi article mil gaya, to error bhej do aur delete na karo
    if (article) {
      return res.status(400).json({
        success: false,
        message: 'Category is associated with an article' // Yani delete nahi kar sakte
      });
    }

    // 🪄 Step 4: Agar koi article linked nahi hai, to ab category safe hai delete karne ke liye
    await category.deleteOne(); // MongoDB se category delete kar deta hai

    // 🪄 Step 5: Delete hone ke baad success response bhej do
    res.json({ success: true });

  } catch (error) {
    // 🪄 Step 6: Agar koi error aata hai (jaise DB connection error),
    // to Express ke error handler middleware ko bhej do
    next(error);
  }
};


module.exports = {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory
}