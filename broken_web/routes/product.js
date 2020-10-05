var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/detalleProducto', productController.vistaDetalleProducto );
router.get('/carrito', productController.vistaCarrito);
router.get('/cargarProducto', productController.cargaProduct);
router.get("/vistaProductos", productController.vistaProductos);
router.get("/edicionProductos", productController.edicionProductos); 

module.exports = router;