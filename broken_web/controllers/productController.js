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
    res.render('product', {title: 'Broken Youth'} );
      /*
      for(var i = 0; i < productos.length; i++){
        if(id == productos[i].id){
          
        } 
      } */
      
      
    }, 



    
    
}

module.exports = productController;