/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_soinsauto",
    {
      IDAUTO: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DESCRIPTIONAUTO: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "tb_soinsauto",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
