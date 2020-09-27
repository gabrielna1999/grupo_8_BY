var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.vistaDetalleProducto );
router.get('/carrito', productController.vistaCarrito);

module.exports = router;