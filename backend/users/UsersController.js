const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');
const turnHash = require('../helper/turnHash');


//list all users
router.get('/admin/users', adminAuth, (req, res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/index', {users: users});
    });
});

//To create a new user, remove adminAuth, to limit access in routes, put adminAuth back;
router.get('/admin/users/create', adminAuth,(req, res)=>{
    res.render('admin/users/create');
});

router.post('/users/create', (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user =>{
        if(user == undefined){
            
        var hash = turnHash(password);
        
    User.create({
        email: email,
        password: hash
    }).then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    });
        }else{
            res.redirect('/login');
        }

    })

});

router.get('/login', (req, res)=>{
    res.render('admin/users/login');
});

router.post('/authenticate', (req, res)=>{
    var email = req.body.email
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user=>{
        if(user != undefined){
            var pwdVerified = bcrypt.compareSync(password, user.password);
            if(pwdVerified){
                req.session.user={
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            }else{
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }
    })
});

//delete user
router.post('/users/delete', adminAuth,(req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect('/login');
            }).catch((err)=>{
                res.send(err);
            })
            
        }else{
            res.redirect('/login');
        }
    }else{
        res.redirect('/');
    };
});

router.get('/logout', (req, res)=>{
    req.session.user = undefined;
    res.redirect('/');
});

//Edit
router.get('/admin/users/edit/:id', adminAuth,(req, res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect('/admin/users');
    }
    User.findByPk(id).then(users=>{
        if(users != undefined){
            res.render('admin/users/edit', {users: users});
        }else{
            res.redirect('/admin/users');
        }
    }).catch(err=>{
        console.log(err)
        res.redirect('/admin/users');
    });
});

//Update
router.post('/users/update', adminAuth, (req, res)=>{
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;

    var hash = turnHash(password)

    User.update({email: email, password:hash}, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/users');
    }).catch(err=>{
        res.send(err);
    })

});

module.exports = router;