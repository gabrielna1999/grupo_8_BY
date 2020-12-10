var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const usersMiddleware = require('../middlewares/usersMiddleware');

router.get('/detalleProducto/:id', productController.vistaDetalleProducto );
router.get('/carrito', usersMiddleware.esUsuario, productController.vistaCarrito);
router.get('/cargarProducto', usersMiddleware.esAdmin, productController.cargarProducto);
router.post('/cargarProducto', productController.guardarProducto);
router.get("/vistaProductos", productController.vistaProductos);
router.get("/edicionProductos/:id", usersMiddleware.esAdmin, productController.editarProductos); 
router.post("/edicionProductos/:id", productController.actualizar);
router.post("/borrar/:id", productController.borrar);
router.get("/agregarProducto/:id", usersMiddleware.esUsuario, cartController.agregarProducto);

module.exports = router;