const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// relacionamento 1-p-1 = belongsTo();
// relacionamento 1-p-n = hasMany();
Category.hasMany(Article);
Article.belongsTo(Category);



module.exports = Article;