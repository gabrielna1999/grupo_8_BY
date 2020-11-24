var { check, validationResult, body} = require('express-validator');

const registerCheckMiddleware = [
    //check('nombre').isEmpty().withMessage("Por favor ingresá tu nombre"),
    check('email').isEmail().withMessage("El email no es válido"),
    check('telefono').isNumeric().withMessage("El telefono no es válido"),
    //check('fecha').isEmpty().withMessage("Por favor ingresá tu fecha de nacimiento"),
    check('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres")        
]

module.exports = registerCheckMiddleware;

