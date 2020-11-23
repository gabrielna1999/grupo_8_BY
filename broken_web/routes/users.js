var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const registerCheckMiddleware = require('../middlewares/registerCheckMiddleware')

router.get("/register", usersController.register);
router.post("/register", registerCheckMiddleware, usersController.registerPost)
router.get("/login", usersController.login);

module.exports = router;
