-- 创建songs表
CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  url TEXT NOT NULL,
  cover TEXT
);

-- 插入第一首歌曲数据
INSERT INTO songs (title, artist, url, cover) VALUES (
  'Jar Of Love',
  '曲婉婷',
  'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev/Jar Of Love.mp3',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20Jar%20Of%20Love%20dark%20theme&image_size=square'
);

-- 查看表结构
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'songs';

-- 查看插入的数据
SELECT * FROM songs;
