const pool = require('./config/db');

async function createTables() {
    try {
        // Crear tabla teachers si no existe
        await pool.query(`
            CREATE TABLE IF NOT EXISTS teachers (
                id SERIAL PRIMARY KEY,
                matricula VARCHAR(50) NOT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                subject VARCHAR(100),
                email VARCHAR(100),
                phone VARCHAR(20),
                degree VARCHAR(100),
                status VARCHAR(20),
                avatar VARCHAR(255)
            )
        `);
        console.log('Tabla teachers lista ✓');

        // Crear tabla records si no existe
        await pool.query(`
            CREATE TABLE IF NOT EXISTS records (
                id SERIAL PRIMARY KEY,
                matricula VARCHAR(50) NOT NULL,
                tipo_registro VARCHAR(20) NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (matricula) REFERENCES teachers(matricula)
            )
        `);
        console.log('Tabla records lista ✓');

    } catch (err) {
        console.error('Error creando tablas:', err.message);
    }
}

async function seedTeachers() {
    try {
        const teachers = [
            {
                matricula: '00834138',
                name: 'María González',
                subject: 'Matemáticas',
                email: 'maria.gonzalez@example.com',
                phone: '+1234567890',
                degree: 'Licenciatura en Matemáticas',
                status: 'active',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
            },
            {
                matricula: '00834139',
                name: 'Carlos Rodríguez',
                subject: 'Historia',
                email: 'carlos.rodriguez@example.com',
                phone: '+1234567891',
                degree: 'Licenciatura en Historia',
                status: 'active',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
            },
            {
                matricula: '00834140',
                name: 'Ana López',
                subject: 'Inglés',
                email: 'ana.lopez@example.com',
                phone: '+1234567892',
                degree: 'Licenciatura en Inglés',
                status: 'active',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
            },
            {
                matricula: '00834141',
                name: 'Pedro Martínez',
                subject: 'Ciencias',
                email: 'pedro.martinez@example.com',
                phone: '+1234567893',
                degree: 'Licenciatura en Biología',
                status: 'active',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro'
            }
        ];

        for (const teacher of teachers) {
            const { matricula, name, subject, email, phone, degree, status, avatar } = teacher;
            await pool.query(
                "INSERT INTO teachers (matricula, name, subject, email, phone, degree, status, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [matricula, name, subject, email, phone, degree, status, avatar]
            );
        }

        console.log('Datos de prueba insertados exitosamente!');
        console.log('Teachers agregados:', teachers.length);
    } catch (err) {
        console.error('Error insertando datos:', err.message);
    } finally {
        pool.end();
    }
}

async function init() {
    await createTables();
    await seedTeachers();
}

init();