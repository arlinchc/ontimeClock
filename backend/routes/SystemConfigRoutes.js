const express = require('express');
const router = express.Router();
const {
    getConfigs,
    getConfig,
    createConfig,
    updateConfig,
    deleteConfig
} = require('../controllers/SystemConfigController');

router.get('/', getConfigs);
router.get('/:id', getConfig);
router.post('/', createConfig);
router.put('/:id', updateConfig);
router.delete('/:id', deleteConfig);

module.exports = router;