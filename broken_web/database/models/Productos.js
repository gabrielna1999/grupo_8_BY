module.exports= (sequelize,dataTypes) => {
const alias = "productos";
const col = { 
 id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
nombre: Sequelize.STRING,
precio: Sequelize.INT,
descripcion: Sequelize.STRING,
categoria_id: {type: Sequelize.INT, foreignKey: true},
 };
const config= {
    tableName: "productos",
    timestamps: false,
};

const productos = sequelize.define(alias,col, config)

return productos;
   
}