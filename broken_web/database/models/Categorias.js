module.exports= (sequelize,dataTypes) => {
    const alias = "categorias";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
     };
    const config= {
        tableName: "categorias",
        timestamps: false,
    };
    
    const categorias = sequelize.define(alias,col, config)
    
    return categorias;
       
    }