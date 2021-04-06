//initializar express router
const express = require(`express`);
const router = express.Router();

//caminho do controlador
const registo_controller = require(`../controllers/registoController`);

//default
router.get(`/`, function(req, res) {
    res.send("/registo como get e post(adicionar)\n /registo/id como get(ver detalhes) patch ou put(update) ou delete");
});

// Registo routes
router.route(`/registo`)
    .get(registo_controller.index)
    .post(registo_controller.create);

router.route(`/registo/:id`)
    .get(registo_controller.details)
    .patch(registo_controller.update)
    .put(registo_controller.update)
    .delete(registo_controller.delete);

module.exports = router;