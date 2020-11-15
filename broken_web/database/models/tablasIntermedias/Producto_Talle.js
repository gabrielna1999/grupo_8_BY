module.exports= (sequelize,dataTypes) => {
    const alias = "producto_talle";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    producto_id: {type: Sequelize.INT, foreignKey: true},
    talle_id: {type: Sequelize.INT, foreignKey: true}
     };
    const config= {
        tableName: "producto_talle",
        timestamps: false,
    };
    
    const producto_talle = sequelize.define(alias,col, config)
    
    return producto_talle;
       
    }