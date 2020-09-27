const productController = {
    vistaDetalleProducto: function(req, res, next) {      
    res.render('product', {title: 'Broken Youth'} );
    },   

    vistaCarrito: function(req, res,next){
    res.render("carrito", {title: 'Broken Youth'});
    }, 

       
}

module.exports = productController;