import React, { useRef, useEffect, useState } from 'react'

interface Lyric {
  time: number // 时间戳（秒）
  text: string // 歌词内容
}

interface LyricsDisplayProps {
  currentLyrics: string
  currentTime: number
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ currentLyrics, currentTime }) => {
  const [lyrics, setLyrics] = useState<Lyric[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const lyricsContainerRef = useRef<HTMLDivElement>(null)
  const currentLyricRef = useRef<HTMLDivElement>(null)

  // 解析歌词字符串
  useEffect(() => {
    if (!currentLyrics) {
      setLyrics([])
      return
    }

    const parsedLyrics: Lyric[] = []
    const lines = currentLyrics.split('\n')

    lines.forEach(line => {
      // 匹配时间戳和歌词内容
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.+)/)
      if (match) {
        const [, minutes, seconds, milliseconds, text] = match
        const time = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 100
        parsedLyrics.push({ time, text })
      }
    })

    // 按时间排序
    parsedLyrics.sort((a, b) => a.time - b.time)
    setLyrics(parsedLyrics)
  }, [currentLyrics])

  // 更新当前歌词索引
  useEffect(() => {
    if (lyrics.length === 0) return

    let index = 0
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        index = i
      } else {
        break
      }
    }

    setCurrentIndex(index)
  }, [currentTime, lyrics])

  // 自动滚动到当前歌词
  useEffect(() => {
    if (currentLyricRef.current) {
      currentLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [currentIndex])

  if (lyrics.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        暂无歌词
      </div>
    )
  }

  return (
    <div 
      ref={lyricsContainerRef}
      className="h-80 overflow-y-auto p-4 bg-gray-800 rounded-lg"
    >
      <div className="space-y-4">
        {lyrics.map((lyric, index) => (
          <div
            key={index}
            ref={index === currentIndex ? currentLyricRef : null}
            className={`text-center py-2 ${index === currentIndex ? 'text-red-500 font-semibold text-lg' : 'text-gray-400'}`}
          >
            {lyric.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LyricsDisplay
