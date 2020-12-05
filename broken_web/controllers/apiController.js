const db = require('../database/models');
const Usuario = require('../database/models/Usuario');

const apiController = {
    cantidadUsuarios: function(req, res, next){
        var xhttp = new XMLHttpRequest();
        let respuesta = {
            header: '200 ok',
            data: {
                cantidad: xhttp.count(Usuario)
            }
        }
        res.json(respuesta);
    }

}

module.exports = apiController;