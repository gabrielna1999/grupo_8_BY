const db = require('../database/models')

const cartController = { 
    
    agregarProducto: function(req, res, next){
        db.Compras.findOne({
            where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0 }
        })
        .then(function(compraEncontrada){          
            console.log("COMPRA ENCONTRADA: " + compraEncontrada)
            if(compraEncontrada != undefined){ 
                console.log("IF")            
                db.ComprasProductos.create({
                    producto_id: req.params.id,
                    compra_id: compraEncontrada.id,
                    cantidad: 0,
                    talle: 0
                })               
                res.redirect('/product/vistaProductos') 
            }
            else{
                console.log("ELSE")
                db.Productos.findByPk(req.params.id)
                .then(function(producto){
                    var precioTotal = (producto.precio /* producto.cantidad */) 
                    db.Compras.create({
                    precio_total: precioTotal, 
                    usuario_id: req.session.usuarioLogueado.id,
                    finalizada: 0,
                }) 
                .then(function(compraCreada){
                    db.ComprasProductos.create({
                    producto_id: req.params.id,
                    compra_id: compraCreada.id,
                    cantidad: 0,
                    talle: 0
                    })                    
                    res.redirect('/product/vistaProductos') 
                })               
                .catch( e => { console.log(e) } )
                    
                })
                   
            }

        }) 
        .catch( e => { console.log(e) } )
        
        
    },

       
}

module.exports = cartController;