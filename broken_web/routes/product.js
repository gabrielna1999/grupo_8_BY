var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const usersMiddleware = require('../middlewares/usersMiddleware');
const detalleMiddleware = require('../middlewares/detalleMiddleware');

router.get('/detalleProducto/:id', productController.vistaDetalleProducto );
router.post('/detalleProducto/:id', detalleMiddleware.SelecTalle ,usersMiddleware.esUsuario, cartController.agregarProducto );
router.get('/carrito', usersMiddleware.esUsuario, cartController.vistaCarrito);
router.get('/carrito/sumar/:id/:cantidad', usersMiddleware.esUsuario, cartController.sumar);
router.get('/carrito/restar/:id/:cantidad', usersMiddleware.esUsuario, cartController.restar);
router.get('/cargarProducto', usersMiddleware.esAdmin, productController.cargarProducto);
router.post('/cargarProducto', productController.guardarProducto);
router.get("/vistaProductos", productController.vistaProductos);
router.get("/edicionProductos/:id", usersMiddleware.esAdmin,productController.editarProductos); 
router.post("/edicionProductos/:id", productController.actualizar);
router.get("/borrar/:id", productController.borrar);
router.get('/sacarDelCarrito/:id', cartController.eliminarProducto );
router.get('/finalizarCompra', usersMiddleware.esUsuario, cartController.finalizarCompra );

module.exports = router;