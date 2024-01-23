CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  pix VARCHAR(255),
  saldo DECIMAL(10, 2) DEFAULT 0.0,
  cupom VARCHAR(255)
);

CREATE TABLE anuncios (
    anuncio_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message_id NUMERIC,
    title VARCHAR(255) NOT NULL,
    value FLOAT NOT NULL,
    description TEXT,
    image TEXT,
    information TEXT,
    criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL
);

CREATE TABLE transactions_saldo (
    transaction_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    mp_id VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    transaction_amount FLOAT NOT NULL,
    transaction_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categorias (name, channel_id) VALUES
  ('league of legends', '1198197653062811668'),
  ('valorant', '1198197771904233534'),
  ('fortnite', '1198197670850867290'),
  ('steam', '1198197740526645248'),
  ('keys', '1198197704862478336');

DELETE FROM users
WHERE user_id = 'id_do_usuario';