const db = require('./database/models');
const Productos = db.Productos;
const Imagenes = db.Imagenes;
const Categorias = db.Categorias;
const Talles = db.Talles;
const ComprasProductos = db.ComprasProductos;

ComprasProductos.findAll({ 
    include: ['producto'],
    raw: true,
    nest: true 
    }) 
    .then(function(comProds){
        comProds.forEach(compProd => {
            console.log(compProd.id); 
        });
        
    }
    
)