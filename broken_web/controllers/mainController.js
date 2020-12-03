const db = require('../database/models');

const mainController = {
  index: function(req, res, next) {
    db.Productos.findAll({
      include: [{association: 'imagen'}],
      raw: true,
      nest: true
    })        
  .then(function(productos){                    
      res.render("index", {productos});                
    })
  .catch(function(error){
      console.log(error);
    })
  } 
}

module.exports = mainController;