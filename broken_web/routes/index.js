var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get("/register", mainController.register);
router.get('/carrito', mainController.vistaCarrito);

module.exports = router;
