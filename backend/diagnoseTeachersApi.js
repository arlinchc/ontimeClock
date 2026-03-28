require('dotenv').config();
const { Client } = require('pg');

const baseConfig = {
  user: process.env.PGUSER || process.env.DB_USER || 'postgres',
  host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.PGPORT || process.env.DB_PORT || 5432),
};

async function getDatabases() {
  const client = new Client({ ...baseConfig, database: process.env.PGDATABASE || process.env.DB_NAME || 'postgres' });
  await client.connect();
  const { rows } = await client.query("SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname");
  await client.end();
  return rows.map((r) => r.datname);
}

async function inspectDb(database) {
  const client = new Client({ ...baseConfig, database });
  try {
    await client.connect();
    const table = await client.query("SELECT to_regclass('public.teachers') AS teachers_table");
    if (!table.rows[0].teachers_table) {
      return { database, hasTeachers: false };
    }

    const columns = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'teachers' ORDER BY ordinal_position"
    );
    const count = await client.query("SELECT COUNT(*)::int AS total FROM teachers");

    let sample = [];
    const colNames = columns.rows.map((c) => c.column_name);
    if (colNames.includes('matricula') && colNames.includes('nombre')) {
      const preview = await client.query("SELECT matricula, nombre FROM teachers ORDER BY nombre LIMIT 5");
      sample = preview.rows;
    }

    return {
      database,
      hasTeachers: true,
      columns: colNames,
      total: count.rows[0].total,
      sample,
    };
  } catch (error) {
    return { database, error: error.message };
  } finally {
    await client.end();
  }
}

(async () => {
  const databases = await getDatabases();
  for (const db of databases) {
    const result = await inspectDb(db);
    console.log(JSON.stringify(result));
  }
})();
