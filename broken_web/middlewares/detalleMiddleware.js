var { check, validationResult, body} = require('express-validator');
var db = require('../database/models');

const detalleMiddleware = {
    talle: [
        check('talle').isLength({min:1}).withMessage("El email no es válido")
    ],

}
module.exports = detalleMiddleware;