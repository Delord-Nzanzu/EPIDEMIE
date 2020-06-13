const modele = require("../models");
const chortid = require("shortid");
const { Op } = require("sequelize");

module.exports = {
  add: function (req, res) {
    const { detaille, estimation, nameepidemie } = req.body;
    const estimations = parseInt(estimation, 10);
    modele.tb_epidemie
      .findOne({
        where: { DESIGNATION: nameepidemie },
      })
      .then((epidemie) => {
        if (!epidemie)
          res.status(403).json({ error: "cette epidemie n'existe pas" });
        else;
        modele.tb_prevention
          .findOrCreate({
            where: {
              [Op.or]: {
                DETAIL: detaille,
                ESTIMATION: estimations,
              },
            },
            defaults: {
              IDPREVENTION: chortid.generate(),
              DETAIL: detaille,
              ESTIMATION: estimations,
              REFIDEPIDEPREV: epidemie.IDEPIDEMIE,
            },
          })
          .then(([resultprevention, created]) => {
            res.json({ resultprevention });
          })
          .catch((error) => {
            console.log(error);
            res.status(403).json({ error });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error });
      });
  },
  notify: function (req, res) {
    modele.tb_prevention.findAll({}).then((result) => {
      res.json({ result });
    });
  },
  update: function (req, res) {
    const { idprev, detaille, estimation } = req.body;
    const estimations = parseInt(estimation, 10);
    modele.tb_prevention
      .update(
        {
          DETAIL: detaille,
          ESTIMATION: estimations,
        },
        { where: { IDPREVENTION: idprev } }
      )
      .then((prevention) => {
        res.json({ prevention });
      });
  },
};
