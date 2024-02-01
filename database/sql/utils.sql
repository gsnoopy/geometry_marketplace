INSERT INTO categorias (name, channel_id) VALUES
  ('league of legends', '1198197653062811668'),
  ('valorant', '1198197771904233534'),
  ('fortnite', '1198197670850867290'),
  ('steam', '1198197740526645248'),
  ('keys', '1198197704862478336');
  ('premium', '0');

DELETE FROM users
WHERE user_id = 'id_do_usuario';

UPDATE users
SET saldo = saldo + 50
WHERE user_id = '901152615864340561'