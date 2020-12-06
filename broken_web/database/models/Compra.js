module.exports= (sequelize,dataTypes) => {
    const alias = "Compras";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        fecha: dataTypes.DATE,
        precio_total: dataTypes.INTEGER,
        usuario_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        },
    };

    const config= {
        tableName: "compras",
        timestamps: false,
    };
    
    const Compra = sequelize.define(alias, cols, config); 

    Compra.associate = function(models){
        Compra.belongsTo(models.Usuarios, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        })

        Compra.hasMany(models.ComprasProductos, {
            foreignKey: 'compra_id',
            as: 'productosComprados'
        })
    }
    
    return Compra;
       
}