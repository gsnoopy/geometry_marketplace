INSERT INTO categorias (name, channel_id) VALUES
  ('league of legends - smurfs', '1198197653062811668'),
  ('league of legends - handlevel', '1210596773836361728'),
  ('league of legends - outros', '1210596921392111677'),
  ('valorant', '1198197771904233534'),
  ('fortnite', '1198197670850867290'),
  ('steam', '1198197740526645248'),
  ('keys', '1210597175202021426');
  ('services', '1210597201894445157');
  ('premium', '0');
  ('everyone', '0');
  ('here', '0');

DELETE FROM users
WHERE user_id = '901152615864340561';

UPDATE users
SET saldo = saldo + 50
WHERE user_id = '901152615864340561'