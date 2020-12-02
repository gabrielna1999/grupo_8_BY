var { check, validationResult, body} = require('express-validator');

const registerCheckMiddleware = [
    check('nombre').isLength({min: 1}).withMessage("Por favor ingresá tu nombre"),
    check('email').isEmail().withMessage("El email no es válido"),
    //check('telefono').isNumeric().withMessage("El telefono no es válido"),
    check('fecha').isDate().withMessage("Por favor ingresá tu fecha de nacimiento"), 

]

module.exports = registerCheckMiddleware;

