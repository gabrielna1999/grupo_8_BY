var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/detalleProducto', productController.vistaDetalleProducto );
router.get('/carrito', productController.vistaCarrito);
router.get('/cargarProducto', productController.cargaProduct);
router.get("/vistaProductos", productController.vistaProductos);
  

module.exports = router;