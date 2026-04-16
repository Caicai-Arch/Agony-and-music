import React from 'react'

interface MyMusicProps {
  songs: any[]
  onPlaySong: (song: any) => void
}

const MyMusic: React.FC<MyMusicProps> = ({ songs, onPlaySong }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">我的音乐</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">我的歌单</h2>
          <div className="space-y-2">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded">
              <span className="text-gray-400 mr-3">🎵</span>
              <span>我喜欢的音乐</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-700 rounded">
              <span className="text-gray-400 mr-3">🎵</span>
              <span>最近播放</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-700 rounded">
              <span className="text-gray-400 mr-3">🎵</span>
              <span>创建的歌单</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">本地音乐</h2>
          <div className="space-y-2">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => onPlaySong(song)}
              >
                <span className="text-gray-400 mr-3">▶️</span>
                <div className="flex-1">
                  <div>{song.title}</div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                </div>
                <span className="text-gray-400 text-sm">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">歌手</h2>
          <div className="space-y-2">
            {Array.from(new Set(songs.map(song => song.artist))).map((artist) => (
              <div key={artist} className="flex items-center p-2 hover:bg-gray-700 rounded">
                <span className="text-gray-400 mr-3">👤</span>
                <span>{artist}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyMusic
