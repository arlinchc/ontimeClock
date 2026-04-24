const {
    getAllConfigs,
    getConfigById,
    createConfig,
    updateConfig,
    deleteConfig,
    getworkdays,
    updateworkday,
    createworkday,
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
} = require('../models/SystemConfigModel');

// ── Configuración General ──
exports.getConfigs = async (req, res) => {
    try {
        const configs = await getAllConfigs();
        res.json(configs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

// ── Work Days ──
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

// ── Roles ──
exports.getRoles = async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener roles' });
    }
};

exports.getRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await getRolById(id);
        if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json(rol);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener rol' });
    }
};

exports.createRol = async (req, res) => {
    try {
        const newRol = await createRol(req.body);
        res.status(201).json(newRol);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear rol' });
    }
};

exports.updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await updateRol(id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
};

exports.deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteRol(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar rol' });
    }
};