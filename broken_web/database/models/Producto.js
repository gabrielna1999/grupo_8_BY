module.exports = (sequelize, dataTypes) => {
    const alias = "Productos";
    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        precio: dataTypes.INTEGER,
        descripcion: dataTypes.STRING,
        categoria_id: {type: dataTypes.INTEGER, foreignKey: true},
    };
    const config= {
        tableName: "productos",
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.hasMany(models.Imagenes, {
            foreignKey: 'producto_id',
            as: 'imagen'
        })

        Producto.belongsTo(models.Categorias, {
            foreignKey: 'categoria_id',
            as: 'categoria'
        })

        Producto.belongsToMany(models.Talles, {
            as: 'talles',
            through: 'producto_talle',
            foreignKey: 'producto_id',
            otherKey: 'talle_id',
            timestamps: false
        })

        Producto.hasMany(models.ComprasProductos, {
            foreignKey: 'producto_id',
            as: 'compras'
        })
    }

    return Producto;
   
};