const db = require('../database/models');

const mainController = {
  index: function(req, res, next) {
    db.Productos.findAll({
      include: [{association: 'imagen'}],
      raw: true,
      nest: true
    })        
    .then(function(productos){  
        console.log(req.session.cantidadDeItems + " CANTIDAD DE PRODUCTOS")                  
        res.render("index", {productos, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems});                
    })
    .catch(function(error){
        console.log(error);
    })
  } 
}

module.exports = mainController;