const db = require('../database/models');

const productController = {
    vistaDetalleProducto: function(req, res, next) {      
        db.Productos.findByPk(req.params.id, {
            include: { all: true }

        })        
        .then(function(producto){
            console.log(producto.talles)               
            res.render("detalleProducto", {producto, usuarioLogueado: req.session.usuarioLogueado, admin: req.admin});                
        })
        .catch(function(error){
            console.log(error);
        })
       
    },   

    vistaCarrito: function(req, res,next){
        // Busco si el usuario logueado tiene una compra iniciada
        db.Compras.findOne({ include: ['comprasProductos'], where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0}})
        .then(function(compraEncontrada){
            // Si no la tiene, devuelvo el carrito vacio
            if(compraEncontrada == undefined){
                res.send("Carrito vacio")
            }
            // Si la tiene, devuelvo el carrito con todos los productos que contiene:
            else{      
                // Creo un array 'carrito' que va a contener todos los productos          
                var carrito = []
                // Traigo todos los productos asociados a esta compra a traves de la tabla intermedia 'compras_productos'
                db.ComprasProductos.findAll({ 
                    include: {association: 'producto'},
                    where: { compra_id: compraEncontrada.id }
                })
                // Por cada 'compra_producto' encontrado, busco la informacion del producto que corresponde y lo agrego al carrito
                .then(compraProductosEncontrados => {
                    compraProductosEncontrados.forEach(compraProducto => {
                        console.log("ESTE ES UN PRODUCTO: " + compraProducto.producto.nombre)
                        carrito.push(compraProducto.producto)
                    });
                    
                    carrito.forEach(producto => {
                        console.log("UN PRODUCTO EN EL CARRITO: " + producto.nombre)
                    });

                    // Renderizo el carrito pasandole el array de productos asociados a la compra
                    res.render("carrito", {carrito, usuarioLogueado: req.session.usuarioLogueado});
                })
                .catch(function(error){
                    console.log(error);
                })
                
            }
        })
        .catch(function(error){
            console.log(error);
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