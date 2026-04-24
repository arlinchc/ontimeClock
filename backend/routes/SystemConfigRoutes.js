const express = require('express');
const router = express.Router();
const SystemConfigController = require('../controllers/SystemConfigController');

// Rutas para Work Days
router.get('/work-days', SystemConfigController.getworkdays);
router.post('/work-days', SystemConfigController.createworkday);
router.put('/work-days/:id', SystemConfigController.updateworkday);

// Rutas para Closed Days
router.get('/closed-days', SystemConfigController.getClosedDays);
router.post('/closed-days', SystemConfigController.createClosedDay);
router.delete('/closed-days/:id', SystemConfigController.deleteClosedDay);

// Rutas para Configuración General
router.get('/', SystemConfigController.getConfigs);
router.get('/:id', SystemConfigController.getConfig);
router.post('/', SystemConfigController.createConfig);
router.put('/:id', SystemConfigController.updateConfig);
router.delete('/:id', SystemConfigController.deleteConfig);

module.exports = router;