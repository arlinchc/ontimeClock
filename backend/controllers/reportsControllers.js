const reportsModel = require('../modelos/reportsModel');

exports.getSummaryReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate y endDate son obligatorios' });
    }

    const data = await reportsModel.getSummaryReport(startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error.message);

    if (
      error.message.includes('formato') ||
      error.message.includes('inicio no puede ser mayor')
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

exports.getTeacherReportDetails = async (req, res) => {
  try {
    const { matricula } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate y endDate son obligatorios' });
    }

    const data = await reportsModel.getTeacherReportDetails(matricula, startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error('Error al generar detalle del reporte:', error.message);

    if (
      error.message.includes('formato') ||
      error.message.includes('inicio no puede ser mayor')
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al generar detalle del reporte' });
  }
};
