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
        res.redirect('/product/vistaProductos')
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
       let pedidoProductos = db.Productos.findByPk(req.params.id);
       let pedidoCategorias = db.Categorias.findAll();

       Promise.all([pedidoProductos, pedidoCategorias])
        .then(function([productos, categorias]){
            res.render("edicionProductos", {productos:productos, categorias:categorias});
        })
    },

    actualizar: function(req, res, next){
        db.Productos.update({
            nombre: req.body.producto,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria_id: req.body.categoria,
        }, {
            where:{
                id: req.params.id
            }
        })

        res.redirect("/product/vistaProductos")



    },

    borrar: function(req, res){
        db.Productos.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect("/product/vistaProductos")
    }

       
}

module.exports = productController;