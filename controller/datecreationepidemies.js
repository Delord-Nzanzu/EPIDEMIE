const modele = require("../models");
const shortid = require("shortid");
const { Op } = require("sequelize");

module.exports = {
  add: function (req, res) {
    const { lien, datecreation, epidemie } = req.body;
    modele.tb_epidemie
      .findOne({
        where: { DESIGNATION: epidemie },
      })
      .then((epide) => {
        if (!epide)
          res.status(403).json({ error: "cette epidemie n'existe pas" });
        else
          modele.tb_datecreation
            .findOrCreate({
              where: {
                [Op.or]: {
                  LIEN: lien,
                  DATECREATION: datecreation,
                },
              },
              defaults: {
                IDDATECREATION: shortid.generate(),
                LIEN: lien,
                DATECREATION: datecreation,
                REFIDEPIDENCREATION: epide.IDEPIDEMIE,
              },
            })
            .then(([datecreations, created]) => {
              console.log(datecreations.get({ plain: true }));
              res.json({ datecreations });
            })
            .catch((error) => {
              console.log(error);
              res.status(403).json(error);
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json(error);
      });
  },
  update: function (req, res) {
    const { idecreation, lien, datecreation } = req.body;
    modele.tb_datecreation
      .findOne({
        where: { IDDATECREATION: idecreation },
      })
      .then((datecreate) => {
        if (!datecreate) res.json({ error: "price error" });
        else
          modele.tb_datecreation
            .update(
              {
                LIEN: lien,
                DATECREATION: datecreation,
              },
              { where: { IDDATECREATION: idecreation } }
            )
            .then((datecrateeupdate) => {
              res.json(datecrateeupdate);
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
    modele.tb_datecreation.findAll({}).then((rest) => {
      if (rest == "") res.status(403).json({ error: "empty" });
      res.json({ rest });
    });
  },
};
