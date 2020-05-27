/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_soismedicau",
    {
      IDSOISMEDICA: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DESCRIPTIONMEDICAU: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "tb_soismedicau",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
