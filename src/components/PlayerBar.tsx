import { useState, useEffect, useRef } from 'react'

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

interface PlayerBarProps {
  currentSong: Song | null
  isPlaying: boolean
  onTogglePlay: () => void
  audioRef: React.RefObject<HTMLAudioElement>
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentSong, isPlaying, onTogglePlay, audioRef }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // 监听音频事件
  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration || 0)
    }

    const handleEnded = () => {
      // 歌曲结束时的处理
    }

    audioElement.addEventListener('timeupdate', handleTimeUpdate)
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioElement.addEventListener('ended', handleEnded)

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audioElement.removeEventListener('ended', handleEnded)
    }
  }, [audioRef])

  // 处理进度条点击
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const percentage = clickX / width
    const newTime = percentage * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // 处理音量变化
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newVolume = (clickX / width) * 100

    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  // 当歌曲变化时重置时间
  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
  }, [currentSong])

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center p-4">
      {/* 歌曲信息 */}
      <div className="flex items-center w-1/4">
        <img 
          src={currentSong?.cover || "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20dark%20theme%20red%20accent&image_size=square"} 
          alt={currentSong?.title || "当前播放"} 
          className="w-12 h-12 object-cover mr-4"
        />
        <div>
          <h4 className="font-medium">{currentSong?.title || "未选择歌曲"}</h4>
          <p className="text-gray-400 text-sm">{currentSong?.artist || ""}</p>
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
            onClick={onTogglePlay}
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
          <div 
            ref={progressBarRef}
            className="flex-1 bg-gray-700 rounded-full h-1 mr-2 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-red-500 h-1 rounded-full" 
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
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
        <div 
          className="w-32 bg-gray-700 rounded-full h-1 mr-4 cursor-pointer"
          onClick={handleVolumeChange}
        >
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