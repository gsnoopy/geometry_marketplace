CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pix VARCHAR(255),
  saldo DECIMAL(10, 2) DEFAULT 0.0,
  cupom VARCHAR(255)
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL
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


CREATE TABLE transactions_saldo (
    transaction_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    mp_id VARCHAR(255) NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    transaction_amount FLOAT NOT NULL,
    transaction_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions_anuncio (
    transaction_id SERIAL PRIMARY KEY,
    seller_id VARCHAR(255) NOT NULL,
    buyer_id VARCHAR(255) NOT NULL,
    saldo NUMERIC NOT NULL,
    saldo_retido NUMERIC NOT NULL,
    taxa NUMERIC NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categoria_id INTEGER REFERENCES categorias(id),
    anuncio_title VARCHAR(255) NOT NULL
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    seller_id VARCHAR(255),
    category VARCHAR(255),
    value NUMERIC,
    revenue NUMERIC,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cupons (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usos INT DEFAULT 0
);

CREATE TABLE premiums (
    user_id VARCHAR(255) PRIMARY KEY,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);