var express = require('express');
var router = express.Router();


const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', mainController.index);

router.get("/carrito", function(req, res , next){
    res.render("carrito");
  });

/* GET register page. */
router.get("/register", function(req, res, next){
  res.render("register");
});

module.exports = router;
