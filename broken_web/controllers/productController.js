const productController = {
    vistaProducto: function(req, res, next) {
        res.render('product', { title: 'Broken Youth' });
      }
}

module.exports = productController;