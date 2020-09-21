var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.vistaDetalleProducto );

module.exports = router;