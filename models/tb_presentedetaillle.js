/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_presentedetaillle",
    {
      IDPRESENTDETAIL: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      DETAILLE: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      DATEENREG: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      REFIDPRESENTER: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_presente",
          key: "IDPRESENTER",
        },
      },
      REFIDSYMPTOM: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_symptome",
          key: "IDSYMPTOME",
        },
      },
    },
    {
      tableName: "tb_presentedetaillle",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
