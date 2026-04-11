import { useState } from 'react'

const PlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, _setCurrentTime] = useState(120)
  const [duration, _setDuration] = useState(300)
  const [volume, _setVolume] = useState(70)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center p-4">
      {/* 歌曲信息 */}
      <div className="flex items-center w-1/4">
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20dark%20theme%20red%20accent&image_size=square" 
          alt="当前播放" 
          className="w-12 h-12 object-cover mr-4"
        />
        <div>
          <h4 className="font-medium">Shape of You</h4>
          <p className="text-gray-400 text-sm">Ed Sheeran</p>
        </div>
      </div>

      {/* 播放控制 */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center space-x-6 mb-2">
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">🔀</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">⏮️</span>
          </button>
          <button 
            className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
            onClick={togglePlay}
          >
            <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">⏭️</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">🔁</span>
          </button>
        </div>
        <div className="flex items-center w-full max-w-2xl">
          <span className="text-gray-400 text-sm mr-2">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-700 rounded-full h-1 mr-2">
            <div 
              className="bg-red-500 h-1 rounded-full" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 音量控制 */}
      <div className="w-1/4 flex items-center justify-end">
        <button className="text-gray-400 hover:text-white mr-2">
          <span className="text-xl">🔇</span>
        </button>
        <div className="w-32 bg-gray-700 rounded-full h-1 mr-4">
          <div 
            className="bg-red-500 h-1 rounded-full" 
            style={{ width: `${volume}%` }}
          ></div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <span className="text-xl">📱</span>
        </button>
      </div>
    </div>
  )
}

export default PlayerBar