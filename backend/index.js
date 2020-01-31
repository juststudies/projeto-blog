const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const connection = require('./database/database');
const app = express();
const router = require('./routes');

//Sessions
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    cookie:{maxAge: 3600000}
}));



// View Engine
app.set('views', path.resolve('../views'));
app.set('view engine', 'ejs');

//Static 
app.use(express.static(path.resolve('../public')));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//Database connection
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso!');
    }).catch((err)=>{
        console.log(err);
    });

app.use(router);


app.listen(8080, ()=>{
    console.log('O servidor tá rodando na: 8080');
});