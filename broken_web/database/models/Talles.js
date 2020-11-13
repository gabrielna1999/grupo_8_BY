module.exports= (sequelize,dataTypes) => {
    const alias = "talles";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING
     };
    const config= {
        tableName: "talles",
        timestamps: false,
    };
    
    const talles = sequelize.define(alias,col, config)
    
    return talles;
       
    }