var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const registerCheckMiddleware = require('../middlewares/registerCheckMiddleware');
const emailCheckMiddleware = require('../middlewares/emailCheckMiddleware');
const passwordCheckMiddleware = require('../middlewares/passwordCheckMiddleware');

router.get("/register", usersController.register);
router.post("/register", registerCheckMiddleware, emailCheckMiddleware, passwordCheckMiddleware, usersController.registerPost)
router.get("/login", usersController.login);

module.exports = router;
