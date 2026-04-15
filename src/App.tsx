import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import PlayerBar from './components/PlayerBar'
import ParticleEffect from './components/ParticleEffect'
import Navbar from './components/Navbar'
import { supabase } from './lib/supabase'

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

interface Playlist {
  id: number
  title: string
  cover: string
  description: string
}

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 从Supabase获取歌曲数据
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log('开始获取歌曲数据...')
        const { data, error } = await supabase
          .from('songs')
          .select('*')
        
        console.log('获取到的数据:', data)
        console.log('错误信息:', error)
        
        if (error) {
          throw error
        }
        
        // 为每个歌曲添加默认封面和时长
        const songsWithDefaults = (data || []).map((song: any) => ({
          id: song.id,
          title: song.title,
          artist: song.artist,
          cover: song.cover || `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20${encodeURIComponent(song.title)}%20dark%20theme&image_size=square`,
          duration: song.duration || '3:00',
          url: song.url
        }))
        
        console.log('处理后的数据:', songsWithDefaults)
        setSongs(songsWithDefaults)
      } catch (error: any) {
        console.error('Error fetching songs:', error)
        // 使用默认歌曲数据作为 fallback
        const fallbackSongs = [
          {
            id: 1,
            title: 'Shape of You',
            artist: 'Ed Sheeran',
            cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20shape%20of%20you%20dark%20theme&image_size=square',
            duration: '3:53',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          },
          {
            id: 2,
            title: 'Jar Of Love',
            artist: '曲婉婷',
            cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20Jar%20Of%20Love%20dark%20theme&image_size=square',
            duration: '3:00',
            url: 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev/Jar Of Love.mp3'
          }
        ]
        console.log('使用 fallback 数据:', fallbackSongs)
        setSongs(fallbackSongs)
      }
    }

    fetchSongs()
  }, [])

  // 推荐歌单数据
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

  // 播放歌曲
  const playSong = (song: Song) => {
    setCurrentSong(song)
    if (audioRef.current) {
      audioRef.current.src = song.url
      audioRef.current.play().catch(err => console.error('播放失败:', err))
      setIsPlaying(true)
    }
  }

  // 切换播放/暂停
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.error('播放失败:', err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  // 搜索函数
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    // 过滤歌曲列表，匹配标题、歌手或专辑
    const results = songs.filter(song => {
      const searchLower = query.toLowerCase()
      return (
        song.title.toLowerCase().includes(searchLower) ||
        song.artist.toLowerCase().includes(searchLower)
      )
    })
    setSearchResults(results)
    setIsSearching(false)
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent 
          songs={isSearching ? [] : (searchQuery ? searchResults : songs)} 
          playlists={playlists} 
          onPlaySong={playSong} 
        />
      </div>
      <PlayerBar 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onTogglePlay={togglePlay} 
      />
      <ParticleEffect />
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}

export default App