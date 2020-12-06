var express = require('express');
var router = express.Router();
const productController = require('../controllers/cartController');

router.get('/carrito', productController.vistaCarrito);
router.get('/carrito', productController.vistaCompra);
router.get("/vistaProductos", productController.vistaProductos); 
router.post('/detalleProducto/:id', cartController.agregarProducto);

module.exports = router;