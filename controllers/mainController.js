const mainController = {
    index: function(req, res, next) {
        res.render('index', { title: 'Broken Youth' });
      }
}

module.exports = mainController;