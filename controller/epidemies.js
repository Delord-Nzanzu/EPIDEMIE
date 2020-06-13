const modele = require("../models");
const shortid = require("shortid");
const { Op } = require("sequelize");

module.exports = {
  add: function (req, res) {
    var { designationepidemie, designationsymptome, detaille } = req.body;

    modele.tb_epidemie
      //insertion in tbale epidemie
      .findOrCreate({
        where: { DESIGNATION: designationepidemie },
        defaults: {
          IDEPIDEMIE: shortid.generate(),
          DESIGNATION: designationepidemie,
        },
      })
      .then(([epidemie, created]) => {
        console.log(epidemie.get({ plain: true }));

        //insertion in table presente
        modele.tb_presente
          .findOrCreate({
            where: { REFIDEPIDEMINE: epidemie.IDEPIDEMIE },
            defaults: {
              IDPRESENTER: shortid.generate(),
              REFIDEPIDEMINE: epidemie.IDEPIDEMIE,
            },
          })
          .then(([presente, created]) => {
            console.log(presente.get({ plain: true }));
          })
          .catch((error) => {
            console.log(error);
            res.status(403).json({ error });
          });
        //recherche in table presenter
        modele.tb_presente
          .findOne({
            where: { REFIDEPIDEMINE: epidemie.IDEPIDEMIE },
          })
          .then((resulpresente) => {
            //insert in table sysptome
            modele.tb_symptome
              .findOrCreate({
                where: { DESIGNATION: designationsymptome },
                defaults: {
                  IDSYMPTOME: shortid.generate(),
                  DESIGNATION: designationsymptome,
                },
              })
              .then(([symptome, created]) => {
                console.log(symptome.get({ plain: true }));
                //insert in tabel presenterdetaille
                modele.tb_presentedetaillle
                  .findOrCreate({
                    where: {
                      [Op.and]: {
                        REFIDPRESENTER: resulpresente.IDPRESENTER,
                        REFIDSYMPTOM: symptome.IDSYMPTOME,
                      },
                    },
                    defaults: {
                      IDPRESENTDETAIL: shortid.generate(),
                      DETAILLE: detaille,
                      DATEENREG: new Date().getDate(),
                      REFIDPRESENTER: resulpresente.IDPRESENTER,
                      REFIDSYMPTOM: symptome.IDSYMPTOME,
                    },
                  })
                  .then(([detail, created]) => {
                    console.log(detail.get({ plain: true }));
                    res.json({ detail });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(403).json({ error });
                  });
              })
              .catch((errorx) => {
                console.log(errorx);
                res.status(403).json({ errorx });
              });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error });
      });
  },
  update: function (req, res) {
    const {
      IDEPIDEMIE,
      IDSYMPTOME,
      designationepidemie,
      designationsymptome,
      detail,
    } = req.body;
    modele.tb_epidemie
      .update(
        {
          where: { IDEPIDEMIE: IDEPIDEMIE },
        },
        { DESIGNATION: designationepidemie }
      )
      .then(() => {
        modele.tb_symptome
          .update(
            {
              where: { IDSYMPTOME: IDSYMPTOME },
            },
            { DESIGNATION: designationsymptome }
          )
          .then(() => {
            modele.tb_presentedetaillle
              .update(
                {
                  DETAILLE: detail,
                },
                { where: { REFIDSYMPTOM: IDSYMPTOME } }
              )
              .then((result) => {
                res.json({ result });
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
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ error });
      });
  },
  seach: function (req, res) {
    let { limit, offset, motseach } = req.query;
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);
    modele.tb_epidemie
      .findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: {
            DESIGNATION: {
              [Op.like]: `%${motseach}`,
            },
          },
        },
      })
      .then((search) => {
        res.json({ search });
      });
  },
  notify: function (req, res) {
    modele.tb_epidemie.findAll({}).then((epid) => {
      res.json({ epid });
      modele.tb_presentedetaillle.findAll({}).then((prestedetail) => {
        //res.json({ prestedetail });
      });
    });
  },
};
