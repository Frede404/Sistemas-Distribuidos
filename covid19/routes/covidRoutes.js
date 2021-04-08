//initializar express router
const express = require(`express`);
const router = express.Router();

//caminho do controlador
const covid_controller = require(`../controllers/covidController`);

//default
router.route('/').get(covid_controller.index);

// Registo routes
router.route('/importar').post(covid_controller.import);

router.route('/casos_diarios').get(covid_controller.novos_casos_dia);

router.route('/uci_diarios').get(covid_controller.uci_diarios);

router.route('/maximo/:ordem').get(covid_controller.ordenarcasos);

router.route('/media').get(covid_controller.media);


router.route('/apagar_tudo').delete(covid_controller.delete);

module.exports = router;