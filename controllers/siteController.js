// include models file category , news , user , setting

const moongoose = require('mongoose');

const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');
const settingModel = require('../models/Setting');
const commentModel = require('../models/Comment');
const paginate = require('../utils/paginate')
const createError = require('../utils/error-message')

const index = async (req,res) => {
  // sara news ka data fetch kiya hai database se
  const paginatedNews = await paginate(newsModel, {}, 
                                      req.query, {
                                      populate: [ // jo bhi related data hume chahiye wo populate karenge
                                        { path: 'category', select: 'name slug' }, // category ka name aur slug chahiye
                                        { path: 'author', select: 'fullname' } // author ka fullname chahiye
                                      ],   
                                      sort: '-createdAt' })

  // res.json({ paginatedNews })
  res.render('index', { paginatedNews , query: req.query})
 }

// category pe click karne pe ye function call hoga
const articleByCategories = async (req,res, next) => {
  const category = await categoryModel.findOne({ slug: req.params.name }); // yha hum category ka data fetch kar rahe hai slug ke basis pe
  if (!category) {
    return next(createError('Category not found', 404));
  }
  const paginatedNews = await paginate(newsModel, { category: category._id }, 
                                      req.query, {
                                      populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                      ],   
                                      sort: '-createdAt' })

  res.render('category', { paginatedNews, category, query: req.query })
 }


 // single article pe click karne pe ye function call hoga 
const singleArticle = async (req,res, next) => { 
  const singleNews = await newsModel.findById(req.params.id)
                        .populate('category',{'name':1, 'slug':1})
                        .populate('author','fullname')
                        .sort({createdAt: -1})

  if(!singleNews) return next(createError('Article not found', 404));                     

  // Get all comments for this article
  const comments = await commentModel.find({ article: req.params.id, status: 'approved' })
  .sort('-createdAt')                     

  // res.json({ singleNews, comments })                                     
  res.render('single', { singleNews, comments }) // single page pe render kar dena hai
}
// search function for searching articles 
const search = async (req,res) => {
  const searchQuery = req.query.search // jo bhi user ne search kiya hai wo yha milega

  const paginatedNews = await paginate(newsModel, {
                              $or: [
                                { title: { $regex: searchQuery, $options: 'i' } },
                                { content: { $regex: searchQuery, $options: 'i' } }
                              ]
                            }, 
                            req.query, {
                            populate: [
                              { path: 'category', select: 'name slug' },
                              { path: 'author', select: 'fullname' }
                            ],   
                            sort: '-createdAt' })


  res.render('search', { paginatedNews, searchQuery, query: req.query })
 }

const author = async (req,res, next) => { 
  const author = await userModel.findOne({ _id: req.params.name }); // params hume url se id mil rha hai isliye _id se find kar rahe hai
  if (!author) {
    return next(createError('Author not found', 404));
  }

  const paginatedNews = await paginate(newsModel, { author: req.params.name  }, 
                                      req.query, {
                                      populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                      ],   
                                      sort: '-createdAt' })


  res.render('author', { paginatedNews, author, query: req.query })
}

const addComment = async (req,res, next) => { 
  // write a code to save comments in the database
  try {
    const { name, email, content } = req.body; // hume sara data form se milega jaise hi name,email,content form submit hoga
    const comment = new commentModel({ name, email, content, article: req.params.id }); // req.params.id article id url se mil rha hai
    await comment.save(); // comment save kar diya database me
    res.redirect(`/single/${req.params.id}`); // comment add karne ke baad user ko wapas single article page pe redirect kar dena hai
  } catch (error) {
    return next(createError('Error adding comment', 500));
  }
}

module.exports = {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment
}