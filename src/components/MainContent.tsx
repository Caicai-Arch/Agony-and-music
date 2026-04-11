import React from 'react'

interface Playlist {
  id: number
  title: string
  cover: string
  description: string
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
    },
    {
      id: 5,
      title: '华语流行',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20chinese%20pop%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '华语流行歌曲精选'
    },
    {
      id: 6,
      title: '轻音乐',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20light%20music%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '放松心情的轻音乐'
    },
    {
      id: 7,
      title: 'R&B',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20R%26B%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '节奏布鲁斯精选'
    },
    {
      id: 8,
      title: '电影原声',
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20playlist%20cover%20movie%20soundtrack%20dark%20theme%20red%20accent&image_size=square_hd',
      description: '经典电影原声音乐'
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">推荐歌单</h2>
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
    </div>
  )
}

export default MainContent