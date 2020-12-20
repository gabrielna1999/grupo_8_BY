var { check, validationResult, body} = require('express-validator');
const { nextTick } = require('process');
var db = require('../database/models');

const detalleMiddleware = {
    SelecTalle: [
        body("talle").custom(
            (value) => {if(value == 0){
                throw new Error('elejir talle');

            } else {
                next();
            }} 
         )
    ]
                    
    }
        
    

module.exports = detalleMiddleware;