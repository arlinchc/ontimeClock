//controlador para registros de asistencia
const recordsModel = require('../modelos/recordsModel');

exports.createRecord = async (req, res) => {
    try {
        const record = await recordsModel.createRecord(req.body);
        res.status(201).json(record);
    } catch (error) {
        console.error('Error al crear registro:', error.message);
        
        if (error.message.includes('No existe')) {
            res.status(404).json({ error: error.message });
        } else if (
            error.message.includes('Ya registraste') ||
            error.message.includes('Primero debes registrar') ||
            error.message.includes('obligatoria') ||
            error.message.includes('tipo de registro')
        ) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error al registrar asistencia' });
        }
    }
}

exports.getRecords = async (req, res) => {
    try {
        const records = await recordsModel.getRecords();
        res.json(records);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: 'Error al obtener registros' });
    }
}

exports.getRecordsByMatricula = async (req, res) => {
    try {
        const { matricula } = req.params;
        const records = await recordsModel.getRecordsByMatricula(matricula);
        res.json(records);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: 'Error al obtener registros' });
    }
}
