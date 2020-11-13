module.exports= (sequelize,dataTypes) => {
    const alias = "compras";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
    fecha: Sequelize.DATE,
    precio_total: Sequelize.INT,
    usuario_id: {type: Sequelize.INT, foreignKey: true},
     };
    const config= {
        tableName: "compras",
        timestamps: false,
    };
    
    const compras = sequelize.define(alias,col, config)

    compras.associate = function (models){
        compras.belongsTo (models.Usuarios, {
            as: "usuarios",
            foreignKey: "usuarios_id"
        });
    }
    
    return compras;
       
    }