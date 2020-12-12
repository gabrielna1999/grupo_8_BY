const db = require('../database/models')

const cartController = { 
    
    agregarProducto: function(req, res, next){
        db.Compras.findOne({
            where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0 },
            include: {association: 'productos'}

        })
        .then(function(compraEncontrada){          
            if(compraEncontrada != undefined){           
                db.ComprasProductos.create({
                    producto_id: req.params.id,
                    compra_id: compraEncontrada.id,
                    cantidad: req.body.cantidad,
                    talle_id: req.body.talle
                })  
                
                .then(function(compraProductoCreado){
                    db.Productos.findOne({ where: {id: compraProductoCreado.producto_id}})
                    .then(producto => {
                        db.Compras.update({
                            precio_total: compraEncontrada.precio_total + (producto.precio*req.body.cantidad)
                        },{
                            where: { id: compraEncontrada.id } 
                        })
                    })
                    .catch( e => { console.log(e) } )
                    
                    
                })
                .catch( e => { console.log(e) } )
                
                res.redirect('/product/vistaProductos') 
            }
            else{
                db.Productos.findByPk(req.params.id)
                .then(function(producto){
                    var precioTotal = (producto.precio /* producto.cantidad */) 
                    db.Compras.create({
                    precio_total: precioTotal, 
                    usuario_id: req.session.usuarioLogueado.id,
                    finalizada: 0,
                    precio_total: producto.precio*req.body.cantidad
                }) 
                .then(function(compraCreada){
                    db.ComprasProductos.create({
                    producto_id: req.params.id,
                    compra_id: compraCreada.id,
                    cantidad: req.body.cantidad,
                    talle: req.body.talle
                    })    
                                   
                    res.redirect('/product/vistaProductos') 
                })               
                
                .catch( e => { console.log(e) } )
                    
                })
                   
            }

        }) 
        .catch( e => { console.log(e) } )
        
        
    },

    eliminarProducto: function(req, res, next){
        db.Compras.findOne( {
            where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0 },
            include: { association: 'comprasProductos' }
        })
        .then(compraActual => {
            db.ComprasProductos.findOne( {
                where: { producto_id: req.params.id, compra_id: compraActual.id },
                include: { association: 'producto'}
            })
            .then(function(compraProducto){   
                db.Compras.update({
                    precio_total: compraActual.precio_total - (compraProducto.producto.precio*compraProducto.cantidad)
                },{
                    where: { id: compraActual.id } 
                })
                db.ComprasProductos.destroy({
                    where: { id: compraProducto.id }
                })
                
                .catch( e => { console.log(e) } )
                
                
            })
            .catch( e => { console.log(e) } )
            res.redirect('/product/carrito')
        })
        .catch( e => { console.log(e) } )
    },

    finalizarCompra: function(req, res, next){
        db.Compras.findOne({
            include: {association: 'productos', association: 'comprasProductos'},
            where: {usuario_id: req.session.usuarioLogueado.id, finalizada: 0},
        })
        .then((compra)=>{
            compra.update({
                finalizada: 1,
                fecha_finalizacion: new Date()
            })
            console.log(compra)
            res.render('compraFinalizada', {usuarioLogueado: req.session.usuarioLogueado, compra, cantidadDeItems: req.session.cantidadDeItems})
        })
        .catch( e => { console.log(e) } )

    }

       
}

module.exports = cartController;