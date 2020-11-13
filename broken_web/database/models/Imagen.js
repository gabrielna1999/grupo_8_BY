module.exports= (sequelize,dataTypes) => {
    const alias = "imagen";
    const col = { 
    id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    ruta: Sequelize.STRING, 
    producto_id: {type: Sequelize.INT, foreignKey: true},
     };
    const config= {
        tableName: "imagen",
        timestamps: false,
    };
    
    const imagen = sequelize.define(alias,col, config)
    
    return imagen;

    console.log (imagen.findAll());
       
    }
