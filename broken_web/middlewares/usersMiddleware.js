var { check, validationResult, body} = require('express-validator');
var db = require('../database/models')

const usersMiddleware = {

    loginCheck: [
        check('email').isEmail().withMessage("El email no es válido"),
        check('password').isLength({min:8}).withMessage("La contraseña es incorrecta")
    ],    

    loginValid: function(req,res,next){
        if(req.session.usuarioLogueado != undefined){
            let usuarioLogueado = req.session.usuarioLogueado;
            console.log(usuarioLogueado.nombre)
            next()
        }
        else{
            let usuarioLogueado = ""
            next()
        }
    },

    registerCheck: [
        check('nombre').isLength({min: 1}).withMessage("Por favor ingresá tu nombre"),
        check('email').isEmail().withMessage("El email no es válido"),
        check('fecha').isDate().withMessage("Por favor ingresá tu fecha de nacimiento"), 
    
    ],

    passwordCheck: [
        check('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
        check('password').isAlphanumeric().withMessage("La contraseña debe contener al menos una letra y un número"),
        body('rePassword').custom( ( value, {req} ) => {
            if(value !== req.body.password){
                throw new Error('Las contraseñas no coinciden');
            }
            
            return true;
        }),    
    ],

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
    ]
}

module.exports = usersMiddleware;