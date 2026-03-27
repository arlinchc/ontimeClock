const {
    getAllConfigs,
    getConfigById,
    createConfig,
    updateConfig,
    deleteConfig,
    getworkdays,    
    updateworkday   
} = require('../models/SystemConfigModel');

// Manejador para obtener todas las configuraciones
exports.getConfigs = async (req, res) => {
    try {
        const configs = await getAllConfigs();
        res.json(configs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manejador para obtener una configuración por ID
exports.getConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const config = await getConfigById(id);
        if (!config) return res.status(404).json({ message: 'Configuración no encontrada' });
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createConfig = async (req, res) => {
    try {
        const newConfig = await createConfig(req.body);
        res.status(201).json(newConfig);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await updateConfig(id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteConfig(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manejadores para los días laborales (Work_Days)
exports.getworkdays = async (req, res) => {
    try {
        const days = await getworkdays();
        res.json(days);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener días laborales' });
    }
};

exports.createworkday = async (req, res) => {
    try {
        const newDay = await createworkday(req.body);
        res.status(201).json(newDay);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear día laboral' });
    }
};

exports.updateworkday = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await updateworkday(id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar día laboral' });
    }
};