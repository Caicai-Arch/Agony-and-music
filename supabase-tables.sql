-- 创建recent_plays表，用于记录用户播放历史
CREATE TABLE IF NOT EXISTS recent_plays (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  song_id INT REFERENCES songs(id),
  played_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建favorites表，用于记录用户喜欢的歌曲
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  song_id INT REFERENCES songs(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, song_id) -- 确保用户不会重复收藏同一首歌
);

-- 创建索引，提高查询性能
CREATE INDEX IF NOT EXISTS idx_recent_plays_user_id ON recent_plays(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- 插入一些示例数据（可选）
-- INSERT INTO recent_plays (user_id, song_id) VALUES
-- ('user-id-1', 1),
-- ('user-id-1', 2),
-- ('user-id-1', 3);

-- INSERT INTO favorites (user_id, song_id) VALUES
-- ('user-id-1', 2),
-- ('user-id-1', 4),
-- ('user-id-1', 5);
