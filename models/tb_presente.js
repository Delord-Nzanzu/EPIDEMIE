/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_presente",
    {
      IDPRESENTER: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      REFIDEPIDEMINE: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
    },
    {
      tableName: "tb_presente",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
