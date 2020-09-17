var express = require('express');
var router = express.Router();


const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', mainController.index);

module.exports = router;
