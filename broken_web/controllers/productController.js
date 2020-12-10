const db = require('../database/models');

const productController = {
    vistaDetalleProducto: function(req, res, next) {      
        db.Productos.findByPk(req.params.id, {
            include: [{ all: true, nested: true}],
            raw: true,
            nest: true
        })        
        .then(function(producto){            
            res.render("detalleProducto",{producto, usuarioLogueado: req.session.usuarioLogueado, admin: req.admin});                
        })
        .catch(function(error){
            console.log(error);
        })
       
    },   

    vistaCarrito: function(req, res,next){
        db.Compras.findOne({ include: ['comprasProductos'], where: { usuario_id: req.session.id, finalizada: 0}})
        .then(function(compraEncontrada){
            if(compraEncontrada == undefined){
                res.send("Carrito vacio")
            }
            else{                
                res.render("carrito", {usuarioLogueado: req.session.usuarioLogueado, compraEncontrada});
            }
        })
    },
    
    cargarProducto: function(req, res , next){
        if(req.admin == true){
            db.Categorias.findAll()
            .then(function(categorias){
                res.render('cargarProducto', {categorias:categorias, usuarioLogueado: req.session.usuarioLogueado});
            })
        }
        else{
            res.redirect('/')
        }
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
            res.render("vistaProductos",{productos, usuarioLogueado: req.session.usuarioLogueado});                
        })
        .catch(function(error){
            console.log(error);
        })
    },

    editarProductos: function(req, res, next){
       if(req.admin == true){
            let pedidoProductos = db.Productos.findByPk(req.params.id);
            let pedidoCategorias = db.Categorias.findAll();

            Promise.all([pedidoProductos, pedidoCategorias])
            .then(function([productos, categorias]){
                res.render("edicionProductos", {productos:productos, categorias:categorias, usuarioLogueado: req.session.usuarioLogueado});
            })
        }
        else{
            res.redirect('/')
        }
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
        .then(function(){
        res.redirect("/product/vistaProductos")
        })



    },

    borrar: function(req, res){
        db.Productos.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect("/product/vistaproductos")
    }

       
}

module.exports = productController;