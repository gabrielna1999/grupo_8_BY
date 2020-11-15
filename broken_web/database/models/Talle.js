module.exports= (sequelize,dataTypes) => {
    const alias = "Talles";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING
    };

    const config= {
        tableName: "talles",
        timestamps: false,
    };
    
    const Talles = sequelize.define(alias, cols, config)
    
    return Talles;
       
}