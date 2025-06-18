const express = require('express');
const router = express.Router();
const controller = require('../controllers/saldoController');

router.post('/saldo/tambah', controller.tambahSaldo);
router.post('/saldo/kurang', controller.kurangSaldo);
router.get('/saldo', controller.getSaldo);
router.get('/saldo/logs', controller.getLogs);

module.exports = router;
