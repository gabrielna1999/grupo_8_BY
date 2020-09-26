const productController = {
    vistaDetalleProducto: function(req, res, next) {      
    res.render('product', {title: 'Broken Youth'} );
    }   
    
}

module.exports = productController;