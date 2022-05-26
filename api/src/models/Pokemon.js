const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vida:{
      type: DataTypes.INTEGER
    },
    fuerza:{
      type: DataTypes.INTEGER
    },
    defensa:{
      type: DataTypes.INTEGER
    },
    velocidad:{
      type: DataTypes.INTEGER
    },
    altura:{
      type: DataTypes.INTEGER
    },
    peso:{
      type: DataTypes.INTEGER
    },
    img: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {timestamps:false});
};
