CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido_paterno VARCHAR(255) NOT NULL,
    apellido_materno VARCHAR(255),
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(50),
    direccion TEXT,
    ciudad VARCHAR(255),
    pais VARCHAR(100) NOT NULL
);

INSERT INTO customers (
    nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, telefono, direccion, ciudad, pais
) VALUES
(
    'Diego', 'Gutiérrez', 'López', '1985-07-15', 'carlos.gutierrez@example.com', '+5215512345678', 'Calle Falsa 123, Col. Centro', 'Ciudad de México', 'México'
),
(
    'Dahlia', 'Fernández', 'Ramírez', '1990-11-02', 'maria.fernandez@example.com', '+5215567890123', 'Av. Siempre Viva 456, Col. Roma', 'Guadalajara', 'México'
);
