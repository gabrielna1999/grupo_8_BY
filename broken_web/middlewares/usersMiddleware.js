var { check, validationResult, body} = require('express-validator');
var db = require('../database/models')

const usersMiddleware = {

    // Validacion del formulario de login. Chequeo que el mail y contraseña sean correctos.
    loginCheck: [
        check('email').isEmail().withMessage("El email no es válido"),
        check('password').isLength({min:8}).withMessage("La contraseña es incorrecta")
    ],    

    // Chequeo si hay un usuario logueado
    loginValid: function(req,res,next){
        if(req.session.usuarioLogueado != undefined){
            let usuarioLogueado = req.session.usuarioLogueado;
            next()
        }
        else{
            let usuarioLogueado = ""
            next()
        }
    },
    
    // Validacion del formulario de register.
    registerCheck: [
        check('nombre').isLength({min: 1}).withMessage("Por favor ingresá tu nombre"),
        check('email').isEmail().withMessage("El email no es válido"),
        check('fecha').isDate().withMessage("Por favor ingresá tu fecha de nacimiento"), 
        check('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
        check('password').isAlphanumeric().withMessage("La contraseña debe contener al menos una letra y un número"),
        body('rePassword').custom( ( value, {req} ) => {
            if(value !== req.body.password){
                throw new Error('Las contraseñas no coinciden');
            }
            
            else{
                return true;
            }
        }), 
    
    ],

    // Chequeo que el usuario que esta intentando registrarse no este poniendo un mail que ya esta en uso
    emailCheck: [

        body('email').custom( value => {
            return db.Usuarios.findOne({
                where: { email: value }
            })
            .then(usuario => {
                if(usuario){
                    return Promise.reject('Ya existe un usuario registrado con ese email')
                }
            })
        })
    ],

    // 
    recordame: function(req,res,next){
        if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
            db.Usuarios.findOne({
                where: { email: req.cookies.recordame.email }
            })
            .then((usuario) => {
                req.session.usuarioLogueado = usuario
            })
        }
        else{
            next();
        }

    },

    // Bloqueo las vistas de register y login para usuarios ya logueados.
    soloInvitados: function(req, res, next){
        if(req.session.usuarioLogueado == undefined){
            next();
        }
        else{
            res.redirect('/')
        }
    },

    // Chequeo si el usuario logueado es admin
    esAdmin: function(req, res, next){
        if(req.session.usuarioLogueado != undefined){
            db.Usuarios.findOne({
                where: { email: req.session.usuarioLogueado.email}
            })
            .then(function(usuario){
                if(usuario.admin){
                    console.log("Admin");
                    next()
                }
                else{
                    console.log("Invitadx");
                    next();                    
                }
                
                
            })
            .catch(e => {
                console.log(e)
            })
        }
        else{
            next()
        }
    }
}

module.exports = usersMiddleware;