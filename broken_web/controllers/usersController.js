var { check, validationResult, body } = require('express-validator');
var db = require('../database/models')

const usersController = {    

    login: function(req,res,next) {
        res.render("login");
    },

    register: function(req, res, next){
        res.render("register");
    },

    registerPost: function (req, res, next){
        var errors = validationResult(req);
        console.log(req.body)
        
        if(errors.isEmpty()){
            db.Usuarios.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                fecha_nacimiento: req.body.fecha                
            })
            .then(()=>{
                res.render('login')                
            })
            .catch(e=>{
                console.log(e)
            })
            // res.redirect('/')
        }
        else{
            console.log(errors);
            return res.render("register", { errors: errors.errors })
        }

        
    }
    
}

module.exports = usersController;
