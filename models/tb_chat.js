/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_chat",
    {
      IDCHAT: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      MESSAGE: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      REFIDPERSONNE: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_personne",
          key: "IDPERSONNE",
        },
      },
      REFIDSUJET: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "tb_sujet",
          key: "IDSUJET",
        },
      },
    },
    {
      tableName: "tb_chat",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
