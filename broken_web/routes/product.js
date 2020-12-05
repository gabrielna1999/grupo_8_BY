var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/detalleProducto/:id', productController.vistaDetalleProducto );
router.get('/carrito', productController.vistaCarrito);
router.get('/cargarProducto', productController.cargarProducto);
router.post('/cargarProducto', productController.guardarProducto);
router.get("/vistaProductos", productController.vistaProductos);
router.get("/edicionProductos/:id", productController.editarProductos); 
router.post("/edicionProductos/:id", productController.actualizar);
router.post("/borrar/:id", productController.borrar);

module.exports = router;