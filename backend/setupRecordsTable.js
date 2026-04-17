const pool = require('./config/db');

async function setupRecordsTable() {
    try {
        // Primero eliminar la tabla si existe
        await pool.query('DROP TABLE IF EXISTS records CASCADE');
        console.log('✓ Tabla anterior eliminada');

        // Crear la tabla records con la estructura correcta
        await pool.query(`
            CREATE TABLE records (
                id SERIAL PRIMARY KEY,
                matricula VARCHAR(50) NOT NULL,
                nombre VARCHAR(150) NOT NULL,
                hora_entrada TIME,
                hora_salida TIME,
                fecha DATE NOT NULL,
                CONSTRAINT records_unique_matricula_fecha UNIQUE (matricula, fecha)
            )
        `);
        console.log('✓ Tabla records creada exitosamente');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        pool.end();
    }
}

setupRecordsTable();
