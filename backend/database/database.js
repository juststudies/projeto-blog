const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PWD}`,{
    host: `${process.env.DATABASE_HOST}`,
    dialect: `${process.env.DATABASE_DIALECT}`,
    timezone: '-03:00'
});

module.exports = connection;