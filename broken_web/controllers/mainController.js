const mainController = {
  index: function(req, res, next) {
      res.render('index', { title: 'Broken Youth' });
  },

  register: function(req, res, next){
  res.render("register", {title: 'Broken Youth'});
  },

  vistaCarrito: function(req, res,next){
  res.render("carrito", {title: 'Broken Youth'});
  },

}

module.exports = mainController;