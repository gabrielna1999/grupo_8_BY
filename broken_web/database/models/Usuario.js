module.exports= (sequelize,dataTypes) => {
    const alias = "Usuarios";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        fecha_nacimiento: dataTypes.DATE,
        admin: dataTypes.BOOLEAN
    };

    const config= {
        tableName: "usuarios",
        timestamps: false,
    };
    
    const Usuarios = sequelize.define(alias, cols, config)
 
    return Usuarios;
       
}