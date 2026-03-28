const pool = require('./config/db');

async function createRecordsTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS records (
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
        console.error('Error creando tabla records:', err.message);
    } finally {
        pool.end();
    }
}

createRecordsTable();
