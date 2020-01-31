const express = require('express');
const router = express.Router();
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

//import models
const Article = require('./articles/Article');
const Category = require('./categories/Category');



router.get('/', (req, res)=>{
    Article.findAll({
        order:[
            ['id', 'DESC'],
        ],
        limit: 3
    }).then(articles=>{
        Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories: categories});
        });
    });
});

router.use('/', categoriesController);    
router.use('/', articlesController);
router.use('/', usersController);

router.use('/:slug', (req, res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories: categories});

            });
        }else{
            res.redirect('/');
        }
    }).catch(err=>{
        res.send(err);
        res.redirect('/')
    });
});

router.get('/category/:slug', (req, res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug:slug
        }, 
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories =>{
                res.render('index', {articles: category.articles, categories: categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err =>{
        res.send(err);
        res.redirect('/');
    });
});

module.exports = router;