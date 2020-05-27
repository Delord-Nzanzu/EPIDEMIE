/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_statistique",
    {
      IDSTATISTIQUE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      NOMBREDECAS: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      NOMBREDEMORT: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      DATESTAT: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      REFEPIDEMINS: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
    },
    {
      tableName: "tb_statistique",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
