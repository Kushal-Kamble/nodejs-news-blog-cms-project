const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');
const fs = require('fs') // file system module
const path = require('path')//path module
const createError = require('../utils/error-message'); // ye createError variable me error-message.js file se import kiya hai
const { validationResult } = require('express-validator')

const allArticle = async (req,res,next) => {
  // write a code to fetch all articles from newsModel and populate category and author fields
  try {
    let articles;
    if(req.role === 'admin'){ 
     articles = await newsModel.find()
                                .populate('category','name')
                                .populate('author','fullname'); // join lagane ke liye populate ka use kiya hai res.json(articles)
    }else{
      articles = await newsModel.find({ author: req.id })
                                .populate('category','name')
                                .populate('author','fullname');
    }                            
    res.render('admin/articles', { role: req.role, articles });
  } catch (error) {
    // console.error(error);
    // res.status(500).send('Server Error');
    next(error)
  }
}

const addArticlePage = async (req,res) => {
  
  const categories = await categoryModel.find();
  res.render('admin/articles/create', { role: req.role, categories, errors: 0 });
}

const addArticle = async (req,res,next) => { 
  // write a code to write new arcticle with image upload
  // req.body se hume form se sara data milta hai
  // req.file se hume uploaded file ka data milta hai
  console.log(req.body, req.file)

  const errors = validationResult(req); 
       if (!errors.isEmpty()) {
        const categories = await categoryModel.find();
        return res.render('admin/articles/create',{
          role: req.role,
          errors: errors.array(),
          categories
        })
      }

  try {
    const { title, content, category } = req.body;
    const article = new newsModel({
      title,
      content,
      category,
      author: req.id,
      image: req.file.filename
    });
    await article.save();
    res.redirect('/admin/article');
  } catch (error) {
    // console.log(error);
    // res.status(500).send('Article not saved');
    next(error)
  }
}

const updateArticlePage = async (req,res,next) => {
  // write a code to get article by id which we get from params and send data to update page
  const id = req.params.id; // parameter se id mil rha hai  

  try {
    const article = await newsModel.findById(id)
                                   .populate('category', 'name') // category ko join krne ke liye
                                   .populate('author', 'fullname'); // author ko join krne ke liye
    if (!article) {
      return next(createError('Article not found', 404));
    }

    if(req.role == 'author'){
      if(req.id != article.author._id){
        return next(createError('Unauthorized', 401));
      }
    }

    const categories = await categoryModel.find();
    res.render('admin/articles/update', { role: req.role, article, categories, errors:0 });
  } catch (error) {
    // console.error(error);
    // res.status(500).send('Server Error');
    next(error)
  }
}

const updateArticle = async (req,res,next) => {
  const id = req.params.id;

  const errors = validationResult(req); 
    if (!errors.isEmpty()) {
    const categories = await categoryModel.find();
    return res.render('admin/articles/update',{
      article: req.body,
      role: req.role,
      errors: errors.array(),
      categories
    })
  }
  
  try {
    const { title, content, category } = req.body;
    const article = await newsModel.findById(id); // check krte hai article database me hai ki nhi
    if (!article) {
      return next(createError('Article not found', 404)); // agar article nhi mila to 404 error bhej dena hai
    }

    if(req.role == 'author'){
      if(req.id != article.author._id){
        return next(createError('Unauthorized', 401));
      }
    }

    article.title = title;
    article.content = content;
    article.category = category;

    if (req.file) {
      const imagePath = path.join(__dirname, '../public/uploads', article.image); // purani image ka path
      fs.unlinkSync(imagePath);// purani image delete kar di
      article.image = req.file.filename;// nayi image set kar di
    }

    await article.save();
    res.redirect('/admin/article');
  } catch (error) {
   next(error)
  }
 }

const deleteArticle = async (req,res,next) => { 
  const id = req.params.id;
  try {
    const article = await newsModel.findById(id);
    if (!article) {
      return next(createError('Article not found', 404));
    }

    if(req.role == 'author'){
      if(req.id != article.author._id){
        return next(createError('Unauthorized', 401));
      }
    }

    try {
        const imagePath = path.join(__dirname, '../public/uploads', article.image);
        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error('Error deleting image:', error);
    }

    await article.deleteOne()
    res.json({ success: true });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  allArticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle
}

