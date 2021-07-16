/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS client(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incident(
 id VARCHAR PRIMARY KEY DEFAULT 'incident-' || LOWER(
        REPLACE(
            CAST(gen_random_uuid() As varchar(15))
            , '-','')
),
client_id INTEGER REFERENCES client(id) NOT NULL,
incident_desc TEXT NOT NULL,
city VARCHAR(50) NOT NULL,
country VARCHAR(50) NOT NULL,
date TIMESTAMP NOT NULL,
weather_report JSON NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW()
);


