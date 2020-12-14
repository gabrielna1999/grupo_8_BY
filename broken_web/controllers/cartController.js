const db = require('../database/models')

const cartController = { 
    
    vistaCarrito: function(req, res,next){
        // Busco si el usuario logueado tiene una compra iniciada
        db.Compras.findOne({ include: ['comprasProductos'], where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0}})
        .then(function(compraEncontrada){
            // Si no la tiene, devuelvo el carrito vacio
            if(compraEncontrada == undefined){
                res.render("carrito", {carrito: undefined, usuarioLogueado: req.session.usuarioLogueado, compra: compraEncontrada, cantidadDeItems: req.session.cantidadDeItems});
            }
            // Si la tiene, devuelvo el carrito con todos los productos que contiene:
            else{      
                // Creo un array 'carrito' que va a contener todos los productos          
                var carrito = []
                // Traigo todos los productos asociados a esta compra a traves de la tabla intermedia 'compras_productos'
                db.ComprasProductos.findAll({ 
                    include: {association: 'producto'},
                    where: { compra_id: compraEncontrada.id }
                })
                // Por cada 'compra_producto' encontrado, busco la informacion del producto que corresponde y lo agrego al carrito
                .then(compraProductosEncontrados => {
                    compraProductosEncontrados.forEach(compraProducto => {
                        compraProducto.producto.talle = compraProducto.talle_id;
                        compraProducto.producto.cantidad = compraProducto.cantidad;
                        compraProducto.producto.compraProductoId = compraProducto.id;
                        carrito.push(compraProducto.producto)
                    });

                    // Renderizo el carrito pasandole el array de productos asociados a la compra
                    res.render("carrito", {carrito, usuarioLogueado: req.session.usuarioLogueado, compra: compraEncontrada, cantidadDeItems: req.session.cantidadDeItems});
                })
                .catch(function(error){
                    console.log(error);
                })
                
            }
        })
        .catch(function(error){
            console.log(error);
        })
    },

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

    },

    // Falta modificar el precio total de compra

    sumar: function(req, res, next){
            var cantidad = Number(req.params.cantidad);    
            var nuevaCantidad = cantidad + 1;        
            db.ComprasProductos.update({ 
                cantidad: nuevaCantidad
                },{
                where: { id: req.params.id }                          

            })
            .then(()=>{
                
                res.redirect('/product/carrito')
            })
            .catch( e => { console.log(e) } )
        
        
    },

    restar: function(req, res, next){
        var nuevaCantidad = req.params.cantidad - 1;
            db.ComprasProductos.update({ 
                cantidad: nuevaCantidad
                },{
                where: { id: req.params.id }                          

            })
            .then(()=>{
                res.redirect('/product/carrito')
            })
            .catch( e => { console.log(e) } )
    },


       
}

module.exports = cartController;