module.exports= (sequelize, dataTypes) => {
    const alias = "Categorias";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
    };

    const config= {
        tableName: "categorias",
        timestamps: false,
    };
    
    const Categoria = sequelize.define(alias,cols,config)
    
    return Categoria;
       
}