CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  pix VARCHAR(255),
  saldo DECIMAL(10, 2) DEFAULT 0.0,
  saldo_restrito DECIMAL(10, 2) DEFAULT 0.0,
  cupom VARCHAR(255)
);

CREATE TABLE anuncios (
    anuncio_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message_id NUMERIC,
    title VARCHAR(255) NOT NULL,
    value FLOAT NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    information VARCHAR(255),
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    mp_id VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    transaction_amount FLOAT NOT NULL
);

INSERT INTO categorias (name) VALUES
    ('league of legends'),
    ('valorant'),
    ('fortnite'),
    ('steam'),
    ('keys');

DELETE FROM users
WHERE user_id = 'id_do_usuario';