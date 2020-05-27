/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_epidemie",
    {
      IDEPIDEMIE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DESIGNATION: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "tb_epidemie",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
