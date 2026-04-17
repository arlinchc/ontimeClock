const pool = require('./config/db');

(async () => {
  try {
    const table = await pool.query("SELECT to_regclass('public.records') AS records_table");
    console.log('table:', table.rows[0]);

    const rel = await pool.query(
      "SELECT c.relkind, n.nspname, c.relname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'records'"
    );
    console.log('relations:', rel.rows);

    const cols = await pool.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='records' ORDER BY ordinal_position"
    );
    console.log('columns:', cols.rows);

    const attrs = await pool.query(
      "SELECT a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod) AS type FROM pg_attribute a JOIN pg_class c ON c.oid = a.attrelid JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'records' AND n.nspname = 'public' AND a.attnum > 0 AND NOT a.attisdropped ORDER BY a.attnum"
    );
    console.log('pg attrs:', attrs.rows);

    const preview = await pool.query('SELECT * FROM records LIMIT 3');
    console.log('preview:', preview.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
  }
})();
