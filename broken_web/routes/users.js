var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/', usersController.users);

module.exports = router;
