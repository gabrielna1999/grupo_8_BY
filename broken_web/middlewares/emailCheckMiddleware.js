var { check, validationResult, body} = require('express-validator');
var db = require('../database/models')

const emailCheckMiddleware = [

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

module.exports = emailCheckMiddleware;
