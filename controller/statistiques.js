const modele = require("../models");
const shortid = require("shortid");
const { Op } = require("sequelize");
const date = require("date-now");

module.exports = {
  add: function (req, res) {
    const { NOMBREDECAS, NOMBREDEMORT, DATESTAT, EPIDEME } = req.body;

    modele.tb_epidemie
      .findOne({ where: { DESIGNATION: EPIDEME } })
      .then((epidemie) => {
        if (!epidemie) res.status(403).json({ error: "epidemie n'existe pas" });
        else
          modele.tb_statistique
            .findOrCreate({
              where: {
                [Op.and]: {
                  REFEPIDEMINS: epidemie.IDEPIDEMIE,
                  DATESTAT: date(),
                },
              },
              defaults: {
                IDSTATISTIQUE: shortid.generate(),
                NOMBREDECAS: NOMBREDECAS,
                NOMBREDEMORT: NOMBREDEMORT,
                DATESTAT: date(),
                REFEPIDEMINS: epidemie.IDEPIDEMIE,
              },
            })
            .then(([statistique, created]) => {
              console.log(statistique.get({ plain: true }));
              res.json(statistique);
            })
            .catch((error) => {
              console.log({ error });
              res.status(403).json({ error });
            });
      })
      .catch((error) => {
        console.log({ error });
        res.status(403).json({ error });
      });
  },
  notify: function (req, res) {
    modele.tb_statistique
      .findAll({})
      .then((result) => {
        if (result == "") res.status(403).json({ error: "aucune statistique" });
        else res.json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error });
      });
  },
  update: function (req, res) {
    const { IDSTATISTIQUE, NOMBREDECAS, NOMBREDEMORT } = req.body;

    modele.tb_statistique
      .update(
        { NOMBREDECAS: NOMBREDECAS, NOMBREDEMORT: NOMBREDEMORT },
        { where: { IDSTATISTIQUE: IDSTATISTIQUE } }
      )
      .then((mdification) => {
        if (!mdification)
          res
            .status(403)
            .json({ error: "aucun element trouve pour la modification" });
        else res.json(mdification);
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error });
      });
  },
};
