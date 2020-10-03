const productController = {
    vistaDetalleProducto: function(req, res, next) {      
    res.render('detalleProducto', {title: 'Broken Youth'} );
    },   

    vistaCarrito: function(req, res,next){
    res.render("carrito", {title: 'Broken Youth'});
    },
    
    cargaProduct: function(req, res , next){
        res.render('cargarProducto', {title: 'Broken Youth'});
    },

    vistaProductos: function(req, res, next){
        res.render("vistaProductos");
    }

       
}

module.exports = productController;