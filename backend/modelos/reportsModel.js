const pool = require('../config/db');

function validateDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

async function getTeachersNameField() {
  const result = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'teachers'"
  );
  const columns = new Set(result.rows.map((row) => row.column_name));

  if (columns.has('nombre')) {
    return 'nombre';
  }
  if (columns.has('name')) {
    return 'name';
  }

  throw new Error('La tabla teachers debe tener columna nombre o name');
}

function getTotalDays(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

exports.getSummaryReport = async (startDate, endDate) => {
  if (!validateDate(startDate) || !validateDate(endDate)) {
    throw new Error('Las fechas deben tener formato YYYY-MM-DD');
  }

  if (startDate > endDate) {
    throw new Error('La fecha de inicio no puede ser mayor a la fecha final');
  }

  const totalDays = getTotalDays(startDate, endDate);
  const nameField = await getTeachersNameField();

  const result = await pool.query(
    `SELECT
        t.matricula::text AS matricula,
        t.${nameField} AS nombre,
        COUNT(r.id) FILTER (WHERE r.hora_entrada IS NOT NULL)::int AS asistencias
     FROM teachers t
     LEFT JOIN records r
       ON r.matricula::text = t.matricula::text
      AND r.fecha BETWEEN $1::date AND $2::date
     GROUP BY t.matricula, t.${nameField}
     ORDER BY t.${nameField} ASC`,
    [startDate, endDate]
  );

  return result.rows.map((row) => {
    const asistencias = Number(row.asistencias || 0);
    const faltas = Math.max(totalDays - asistencias, 0);

    return {
      matricula: row.matricula,
      profesor: row.nombre,
      asistencias,
      faltas,
      totalDias: totalDays,
    };
  });
};

exports.getTeacherReportDetails = async (matricula, startDate, endDate) => {
  if (!validateDate(startDate) || !validateDate(endDate)) {
    throw new Error('Las fechas deben tener formato YYYY-MM-DD');
  }

  if (startDate > endDate) {
    throw new Error('La fecha de inicio no puede ser mayor a la fecha final');
  }

  const result = await pool.query(
    `SELECT
        gs.fecha::date AS fecha,
        r.hora_entrada,
        r.hora_salida,
        CASE WHEN r.hora_entrada IS NOT NULL THEN 'Asistencia' ELSE 'Falta' END AS estado
     FROM generate_series($2::date, $3::date, interval '1 day') AS gs(fecha)
     LEFT JOIN records r
       ON r.matricula::text = $1::text
      AND r.fecha = gs.fecha::date
     ORDER BY gs.fecha ASC`,
    [String(matricula), startDate, endDate]
  );

  return result.rows;
};
