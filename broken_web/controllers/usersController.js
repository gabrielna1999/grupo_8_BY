const usersController = {
    

    users: function(req, res, next) {
        res.send('respond with a resource');
    },

    login: function(req,res,next) {
        res.send("users", {title: 'Broken Youth'});
    },

    register: function(req, res, next){
    res.render("register", {title: 'Broken Youth'});
    },
    
}

module.exports = usersController;