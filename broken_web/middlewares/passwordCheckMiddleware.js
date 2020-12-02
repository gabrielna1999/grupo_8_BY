var { check, validationResult, body} = require('express-validator');
var db = require('../database/models')

const passwordCheckMiddleware = [

    check('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check('password').isAlphanumeric().withMessage("La contraseña debe contener al menos una letra y un número"),
    body('rePassword').custom( ( value, {req} ) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no coinciden');
        }
        
        return true;
    }),    
]

module.exports = passwordCheckMiddleware;
