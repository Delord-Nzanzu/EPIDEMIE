/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_appercu",
    {
      IDAPPERCU: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DESCRIPTION: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      REFIDEPIDE: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
    },
    {
      tableName: "tb_appercu",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
