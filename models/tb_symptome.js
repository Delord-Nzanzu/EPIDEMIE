/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_symptome",
    {
      IDSYMPTOME: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DESIGNATION: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "tb_symptome",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
