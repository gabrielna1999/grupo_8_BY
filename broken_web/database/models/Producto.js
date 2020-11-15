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

    return Producto;
   
};