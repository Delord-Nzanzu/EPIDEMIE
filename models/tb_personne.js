/* jshint indent: 2 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataTypes) {
  const TUser = sequelize.define(
    "tb_personne",
    {
      IDPERSONNE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      IDENTITER: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      GENRE: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      MAIL: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      TELEPHONE: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      TYPE_: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      NIVEAUACCES: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PASSWORDS: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      tableName: "tb_personne",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
  TUser.prototype.generateJWT = function generateJWT() {
    return jwt.sign(
      {
        IDPERSONNE: this.id,
        NIVEAUACCES: this.niveauacc,
      },
      "secretkey"
    );
  };
  TUser.prototype.toAuthJSON = function toAuthJSON() {
    return {
      id: this.id,
      token: this.generateJWT(),
    };
  };
  TUser.prototype.setPassword = function setPassword(password) {
    this.PASSWORDS = bcrypt.hashSync(password, 12);
  };
  TUser.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.PASSWORDS);
  };
  return TUser;
};
