var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middlewares/usersMiddleware');

router.use(usersMiddleware.soloInvitados);


router.get("/register", usersController.register);
router.post("/register", usersMiddleware.registerCheck, usersMiddleware.emailCheck, usersController.processRegister)
router.get("/login", usersController.login);
router.post("/login", usersMiddleware.loginCheck, usersController.processLogin);

module.exports = router;
