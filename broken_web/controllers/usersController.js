var { check, validationResult, body } = require('express-validator');
var db = require('../database/models')

const usersController = {    

    login: function(req,res,next) {
    res.render("login", {usuarioLogueado: req.session.usuarioLogueado});
    },

    processLogin: function(req,res,next){
        var errors = validationResult(req);

        if(errors.isEmpty()){
            db.Usuarios.findOne({
                where: { email: req.body.email }
            })
            .then(function(usuario){
                if(usuario == undefined){
                    res.render("login", { errors: [ {msg: 'No existe un usuario con ese email'}], usuarioLogueado: req.session.usuarioLogueado})
                }
                else{
                    if(usuario.password == req.body.password){
                        req.session.usuarioLogueado = usuario;
                        res.redirect('/')
                    }
                    else{
                        res.render("login", { errors: [ {msg: 'La contraseña es incorrecta'}], usuarioLogueado: req.session.usuarioLogueado})
                    }
                }                                             
                
            })
            .catch(e => {
                console.log(e)
            })
        }
        else{
            return res.render("login", { errors: errors.errors, usuarioLogueado: req.session.usuarioLogueado })
        }
    },

    register: function(req, res, next){
        res.render("register", {usuarioLogueado: req.session.usuarioLogueado});
    },

    processRegister: function (req, res, next){
        var errors = validationResult(req);
        
        if(errors.isEmpty()){
            db.Usuarios.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                fecha_nacimiento: req.body.fecha                
            })
            .then(()=>{
                res.redirect('login')                
            })
            .catch(e=>{
                console.log(e)
            })
            // res.redirect('/')
        }
        else{
            return res.render("register", { errors: errors.errors })
        }

        
    }
    
}

module.exports = usersController;
