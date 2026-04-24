const express = require('express');
const router = express.Router();
const SystemConfigController = require('../controllers/SystemConfigController');

// Rutas para Work Days
router.get('/work-days', SystemConfigController.getworkdays);
router.post('/work-days', SystemConfigController.createworkday);
router.put('/work-days/:id', SystemConfigController.updateworkday);

// Rutas para Roles
router.get('/roles', SystemConfigController.getRoles);
router.get('/roles/:id', SystemConfigController.getRol);
router.post('/roles', SystemConfigController.createRol);
router.put('/roles/:id', SystemConfigController.updateRol);
router.delete('/roles/:id', SystemConfigController.deleteRol);

// Rutas para Configuración General (siempre al final)
router.get('/', SystemConfigController.getConfigs);
router.get('/:id', SystemConfigController.getConfig);
router.post('/', SystemConfigController.createConfig);
router.put('/:id', SystemConfigController.updateConfig);
router.delete('/:id', SystemConfigController.deleteConfig);

module.exports = router;