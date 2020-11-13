module.exports= (sequelize,dataTypes) => {
    const alias = "usuarios";
    const col = { 
     id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fecha_nacimiento: Sequelize.DATE,
    admin: Sequelize.BOOLEAN
     };
    const config= {
        tableName: "usuarios",
        timestamps: false,
    };
    
    const usuarios = sequelize.define(alias,col, config)

    usuarios.associate = function (models){
        usuarios.hasMany (models.Compras, {
            as: "compras",
            foreignKey: "usuarios_id"
        });
    }
    return usuarios;
       
    }