var { check, validationResult, body} = require('express-validator');

const usersController = {    

    login: function(req,res,next) {
        res.render("login");
    },

    register: function(req, res, next){
        res.render("register");
    },

    registerPost: function (req, res, next){
        var errors = validationResult(req);

        if(errors.isEmpty()){
            res.send('Logueado')
            // res.redirect('/')
        }
        else{
            console.log(errors);
            return res.render("register", { errors: errors.errors })
        }

        
    }
    
}

module.exports = usersController;
