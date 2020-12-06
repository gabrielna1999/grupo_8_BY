const db = require('../database/models')

const cartController = { 
    
    agregarProducto: function(req, res, next){
        db.Productos.findByPk (req.params.id,{
            include: [{association: 'imagen' }],
            raw: true,
            nest: true
        })
        .then(function(productos){                     
            res.render("carrito",{productos, usuarioLogueado: req.session.usuarioLogueado});                
        })
        .catch(function(error){
            console.log(error);
        })
    },

       
}

module.exports = cartController;