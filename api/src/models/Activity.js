const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("activity", {
      name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
