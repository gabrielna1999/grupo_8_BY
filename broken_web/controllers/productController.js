const db = require('../database/models')

const productController = {
    vistaDetalleProducto: function(req, res, next) {      
        db.Productos.findByPk(req.params.id, {
            include: [{association: 'imagen'}],
            raw: true,
            nest: true
        })        
        .then(function(producto){                     
            res.render("detalleProducto",{producto});                
        })
        .catch(function(error){
            console.log(error);
        })
       
    },   

    vistaCarrito: function(req, res,next){
        res.render("carrito");
    },
    
    cargarProducto: function(req, res , next){
        db.Categorias.findAll()
            .then(function(categorias){
                res.render('cargarProducto', {categorias:categorias});
            })
        
    },

    guardarProducto: function(req, res, next) {
        db.Productos.create({
            nombre: req.body.producto,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria_id: req.body.categoria,
        })
        .then(function(){
        res.redirect('/product/cargarProducto')
        })
        .catch(function(error){
            console.log(error)
        });
          
    },

    vistaProductos: function(req, res, next){
        db.Productos.findAll({
            include: [{association: 'imagen'}],
            raw: true,
            nest: true
        })        
        .then(function(productos){                     
            res.render("vistaProductos",{productos});                
        })
        .catch(function(error){
            console.log(error);
        })
    },

    editarProductos: function(req, res, next){
        res.render("edicionProductos");
    },
       
}

module.exports = productController;