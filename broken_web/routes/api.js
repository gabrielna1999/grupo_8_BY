var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/cantidadusuarios',apiController.cantidadUsuarios);

module.exports = router;