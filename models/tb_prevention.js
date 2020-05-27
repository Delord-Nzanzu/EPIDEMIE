/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_prevention",
    {
      IDPREVENTION: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DETAIL: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      ESTIMATION: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      REFIDEPIDEPREV: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
    },
    {
      tableName: "tb_prevention",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
