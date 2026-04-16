import React from 'react'

interface LyricsProps {
  currentSong: any
}

const Lyrics: React.FC<LyricsProps> = ({ currentSong }) => {
  // 模拟歌词数据
  const lyrics = currentSong ? [
    { time: '0:00', text: 'Jar Of Love - 曲婉婷' },
    { time: '0:10', text: '是谁导演这场戏' },
    { time: '0:15', text: '在这孤单角色里' },
    { time: '0:20', text: '对白总是自言自语' },
    { time: '0:25', text: '对手都是回忆' },
    { time: '0:30', text: '看不出什么结局' },
    { time: '0:35', text: '自始至终全是你' },
    { time: '0:40', text: '让我投入太彻底' },
    { time: '0:45', text: '故事如果注定悲剧' },
    { time: '0:50', text: '何苦给我美丽' },
    { time: '0:55', text: '演出相聚和别离' },
    { time: '1:00', text: '没有星星的夜里' },
    { time: '1:05', text: '我用泪光吸引你' },
    { time: '1:10', text: '既然爱你不能言语' },
    { time: '1:15', text: '只能微笑哭泣' },
    { time: '1:20', text: '让我从此忘了你' },
  ] : []

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">歌词</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        {currentSong ? (
          <>
            <div className="text-center mb-8">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="w-40 h-40 object-cover rounded-lg mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{currentSong.title}</h2>
              <p className="text-gray-400">{currentSong.artist}</p>
            </div>
            <div className="space-y-4">
              {lyrics.map((line, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-400 w-12">{line.time}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">请先选择一首歌曲</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lyrics
