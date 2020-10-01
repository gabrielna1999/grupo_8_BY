var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/', usersController.users);
router.get("/register", usersController.register);
router.get("/login", usersController.login);

module.exports = router;
