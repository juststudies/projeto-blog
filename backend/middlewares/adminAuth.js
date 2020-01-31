function authAdmin(req, res, next){
    try {
        if(req.session.user != undefined){
            next();
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        res.send(error);
    }
}

module.exports= authAdmin;