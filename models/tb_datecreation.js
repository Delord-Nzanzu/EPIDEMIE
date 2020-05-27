/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_datecreation",
    {
      IDDATECREATION: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      LIEN: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      DATECREATION: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      REFIDEPIDENCREATION: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
    },
    {
      tableName: "tb_datecreation",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
