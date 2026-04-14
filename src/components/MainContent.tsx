import React from 'react'

interface Playlist {
  id: number
  title: string
  cover: string
  description: string
}

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

interface MainContentProps {
  songs: Song[]
  playlists: Playlist[]
  onPlaySong: (song: Song) => void
}

const MainContent: React.FC<MainContentProps> = ({ songs, playlists, onPlaySong }) => {

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* 用户信息区域 */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mr-4">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">用户名称</h2>
            <p className="text-gray-400">欢迎回来！</p>
          </div>
        </div>
      </div>

      {/* 推荐歌单区域 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">推荐歌单</h2>
          <button className="text-red-500 text-sm hover:underline">查看更多</button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
              <div className="relative">
                <img 
                  src={playlist.cover} 
                  alt={playlist.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-bold">{playlist.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近播放区域 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">最近播放</h2>
          <button className="text-red-500 text-sm hover:underline">查看更多</button>
        </div>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-800">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className="flex items-center p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => onPlaySong(song)}
              >
                <img 
                  src={song.cover} 
                  alt={song.title} 
                  className="w-12 h-12 object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
                <div className="text-gray-400 text-sm">{song.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent