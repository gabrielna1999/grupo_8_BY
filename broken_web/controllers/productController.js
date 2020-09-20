/* const productos = [
  { 
    nombre: 'inheritance',
    precio: '$2500',
    descripcion: 'asaaasasa'
}
]
*/

const productController = {
    vistaDetalleProducto: function(req, res, next) {      
      res.render('product', { title: 'Broken Youth' });
      
    }, 



    
    
}

module.exports = productController;