module.exports= (sequelize,dataTypes) => {
    const alias = "compras_productos";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    cantidad: Sequelize.INT,
    compra_id: {type: Sequelize.INT, foreignKey: true}, 
    producto_id: {type: Sequelize.INT, foreignKey: true},
    talle_id: {type: Sequelize.INT, foreignKey: true}
     };
    const config= {
        tableName: "compras_productos",
        timestamps: false,
    };
    
    const compras_productos = sequelize.define(alias,col, config)
    

    return compras_productos;
       
    }