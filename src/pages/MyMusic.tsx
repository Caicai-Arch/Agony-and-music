import React, { useState, useEffect } from 'react'

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

interface RecentPlay {
  id: number
  song_id: number
  played_at: string
  song: Song
}

interface Favorite {
  id: number
  song_id: number
  song: Song
}

interface MyMusicProps {
  songs: Song[]
  onPlaySong: (song: Song) => void
}

const MyMusic: React.FC<MyMusicProps> = ({ songs, onPlaySong }) => {
  const [recentPlays, setRecentPlays] = useState<RecentPlay[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  // 从Supabase获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // 暂时使用Mock数据，因为Supabase表可能还未创建
        // 实际项目中，这里会从Supabase获取数据
        
        // Mock数据
        const mockRecentPlays: RecentPlay[] = songs.slice(0, 5).map((song, index) => ({
          id: index + 1,
          song_id: song.id,
          played_at: new Date(Date.now() - index * 3600000).toISOString(),
          song
        }))
        
        const mockFavorites: Favorite[] = songs.slice(2, 7).map((song, index) => ({
          id: index + 1,
          song_id: song.id,
          song
        }))
        
        setRecentPlays(mockRecentPlays)
        setFavorites(mockFavorites)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [songs])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">我的音乐</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-400">加载中...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 最近播放 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">最近播放</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              {recentPlays.length > 0 ? (
                <div className="space-y-2">
                  {recentPlays.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center p-3 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => onPlaySong(item.song)}
                    >
                      <img 
                        src={item.song.cover} 
                        alt={item.song.title} 
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div>{item.song.title}</div>
                        <div className="text-sm text-gray-400">{item.song.artist}</div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(item.played_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 py-8 text-center">
                  暂无最近播放记录
                </div>
              )}
            </div>
          </div>

          {/* 我喜欢的歌曲 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">我喜欢的歌曲</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              {favorites.length > 0 ? (
                <div className="space-y-2">
                  {favorites.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center p-3 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => onPlaySong(item.song)}
                    >
                      <img 
                        src={item.song.cover} 
                        alt={item.song.title} 
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div>{item.song.title}</div>
                        <div className="text-sm text-gray-400">{item.song.artist}</div>
                      </div>
                      <span className="text-yellow-400">❤️</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 py-8 text-center">
                  暂无喜欢的歌曲
                </div>
              )}
            </div>
          </div>

          {/* 我的收藏 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">我的收藏</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-4xl mb-2">📋</div>
                <div className="font-medium">创建的歌单</div>
                <div className="text-gray-400 text-sm">3个歌单</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-4xl mb-2">💿</div>
                <div className="font-medium">收藏的专辑</div>
                <div className="text-gray-400 text-sm">5张专辑</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-4xl mb-2">🎤</div>
                <div className="font-medium">关注的歌手</div>
                <div className="text-gray-400 text-sm">8位歌手</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="text-4xl mb-2">🎬</div>
                <div className="font-medium">收藏的视频</div>
                <div className="text-gray-400 text-sm">2个视频</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyMusic
