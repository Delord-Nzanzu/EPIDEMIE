/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_traitement",
    {
      IDTRAITEMENT: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      REFIDEPIDEMIA: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_epidemie",
          key: "IDEPIDEMIE",
        },
      },
      REFIDSOISAUTO: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_soinsauto",
          key: "IDAUTO",
        },
      },
      REFDIAMEDICAL: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_soismedicau",
          key: "IDSOISMEDICA",
        },
      },
    },
    {
      tableName: "tb_traitement",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
