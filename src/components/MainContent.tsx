import React from 'react'

interface Playlist {
  id: number
  title: string
  cover: string
  description: string
}

interface RecentSong {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
}

const MainContent: React.FC = () => {
  const playlists: Playlist[] = [
    {
      id: 1,
      title: '每日推荐',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20daily%20recommendation%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '为你推荐的每日歌曲'
    },
    {
      id: 2,
      title: '流行热歌',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20popular%20hits%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '当下最流行的歌曲'
    },
    {
      id: 3,
      title: '摇滚经典',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20rock%20classics%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '经典摇滚歌曲合集'
    },
    {
      id: 4,
      title: '电子舞曲',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20electronic%20dance%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '适合跳舞的电子音乐'
    }
  ]

  const recentSongs: RecentSong[] = [
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20shape%20of%20you%20dark%20theme&image_size=square',
      duration: '3:53'
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20blinding%20lights%20dark%20theme&image_size=square',
      duration: '3:20'
    },
    {
      id: 3,
      title: 'Dance Monkey',
      artist: 'Tones and I',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20dance%20monkey%20dark%20theme&image_size=square',
      duration: '3:29'
    },
    {
      id: 4,
      title: 'Someone Like You',
      artist: 'Adele',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20someone%20like%20you%20dark%20theme&image_size=square',
      duration: '4:45'
    }
  ]

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
            {recentSongs.map((song) => (
              <div key={song.id} className="flex items-center p-4 hover:bg-gray-800 transition-colors">
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