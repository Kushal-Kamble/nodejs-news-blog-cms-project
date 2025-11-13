const express = require('express');
const router = express.Router();

// IMPORT KIYA HAI

const siteController = require('../controllers/siteController');
const loadCommonData = require('../middleware/loadCommonData');

// IMPORT KIYA HAI

router.use(loadCommonData); // ye middleware har route pe chalega taki common data har page pe available ho aur ye sab router pe chalega

router.get('/', siteController.index); // jaisehi koi home page ko call krega ye index function call ho jayega controllers se 
router.get('/category/:name', siteController.articleByCategories); // jaisehi koi category page ko call krega ye articleByCategories function call ho jayega controllers se
router.get('/single/:id', siteController.singleArticle); // jaisehi koi single page ko call krega ye singleArticle function call ho jayega controllers se
router.get('/search', siteController.search); // jaisehi koi search page ko call krega ye search function call ho jayega controllers se
router.get('/author/:name', siteController.author); // jaisehi koi author page ko call krega ye author function call ho jayega controllers se
router.post('/single/:id/comment', siteController.addComment); // jaisehi koi comment page ko call krega ye addComment function call ho jayega controllers se

// 404 Middleware
router.use((req, res, next) => { 
  res.status(404).render('404',{
    message: 'Page not found'
  })
});

// 500 Error Handler
router.use((err, req, res, next) => { 
  console.error(err.stack);
  const status = err.status || 500;
  
  res.status(status).render('errors',{
    message: err.message || 'Something went wrong',
    status
  })
});

module.exports = router;