var { check, validationResult, body } = require('express-validator');
var db = require('../database/models');
const bcrypt = require('bcrypt');

const usersController = {    

    // GET login
    login: function(req,res,next) {
    res.render("login", {usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos});
    },

    // POST login
    processLogin: function(req,res,next){
        var errors = validationResult(req);

        // Si no hay errores, busco en la base de datos un usuario con el email que esta intentando loguearse
        if(errors.isEmpty()){
            db.Usuarios.findOne({
                where: { email: req.body.email }
            })
            .then(function(usuario){
                // Si es undefined (no existe un usuario con ese email) devuelvo el mensaje explicandolo
                if(usuario == undefined){
                    res.render("login", { errors: [ {msg: 'No existe un usuario con ese email'}], usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos})
                }
                // Si encuentro un usuario que coincida, comparo las contrasenas
                else{
                    // Si la contrasena es correcta guardo al usuario en session
                    if(bcrypt.compareSync(req.body.password, usuario.password)){
                        req.session.usuarioLogueado = usuario;

                        // Si clickeo el boton de recordame, guardo al usuario en cookie tambien
                        if(req.body.recordame != undefined){
                            res.cookie('recordame', req.session.usuarioLogueado.email, { maxAge: 60000 })
                        }

                        // Una vez terminado el login redirecciono al home
                        res.redirect('/')
                    }
                    // Si la contrasena es incorrecta devuelvo el mensaje
                    else{
                        res.render("login", { errors: [ {msg: 'La contraseña es incorrecta'}], usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos})
                    }
                }                                             
                
            })
            .catch(e => {
                console.log(e)
            })
        }
        else{
            return res.render("login", { errors: errors.errors, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos })
        }
    },

    // GET register
    register: function(req, res, next){
        res.render("register", {usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos});
    },

    // POST register
    processRegister: function (req, res, next){
        var errors = validationResult(req);
        var passwordCrypt = bcrypt.hashSync(req.body.password, 10);        
        
        if(errors.isEmpty()){
            db.Usuarios.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: passwordCrypt,
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
            return res.render("register", { errors: errors.errors, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeProductos })
        }

        
    },

    // Cerrar Sesion
    cerrarSesion: function(req,res,next){
        req.session.usuarioLogueado = undefined;
        res.redirect('/')

    }

    
    
}

module.exports = usersController;
