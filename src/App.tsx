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

  // 从R2的Public URL获取文件列表
  const getR2FilesFromAPI = async () => {
    try {
      // 由于R2存储桶是公开的，我们可以直接构造文件列表
      // 这里使用默认的R2端点，实际部署时会使用环境变量中的值
      const r2Endpoint = 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev'
      
      // 这里假设我们知道存储桶中的文件列表
      // 在实际应用中，您可能需要手动维护这个列表，或者使用其他方式获取
      const files = [
        {
          name: 'Jar Of Love.mp3',
          url: `${r2Endpoint}/Jar%20Of%20Love.mp3`,
          size: 5000000, // 假设文件大小
          lastModified: new Date()
        }
        // 可以添加更多文件
      ]
      
      return files
    } catch (error) {
      console.error('Error fetching R2 files:', error)
      return []
    }
  }

  // 搜索函数
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    try {
      // 1. 搜索本地歌曲列表
      const localResults = songs.filter(song => {
        const searchLower = query.toLowerCase()
        return (
          song.title.toLowerCase().includes(searchLower) ||
          song.artist.toLowerCase().includes(searchLower)
        )
      })

      // 2. 从API获取R2存储桶中的文件列表
      const r2Files = await getR2FilesFromAPI()
      
      // 3. 过滤R2文件，匹配搜索查询
      const searchLower = query.toLowerCase()
      const filteredR2Files = r2Files.filter((file: any) => 
        file.name.toLowerCase().includes(searchLower)
      )
      
      // 4. 将R2文件转换为Song类型
      const r2Results = filteredR2Files.map((file: any, index: number) => {
        // 从文件名中提取歌曲信息
        const fileName = file.name
        
        // 简单处理：将文件名作为标题，未知作为歌手
        const title = fileName.replace(/\.mp3$/, '')
        
        return {
          id: songs.length + index + 1,
          title,
          artist: '未知',
          cover: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20${encodeURIComponent(title)}%20dark%20theme&image_size=square`,
          duration: '3:00',
          url: file.url
        }
      })

      // 5. 合并搜索结果
      const allResults = [...localResults, ...r2Results]
      setSearchResults(allResults)
    } catch (error) {
      console.error('Error during search:', error)
      // 如果搜索失败，至少显示本地歌曲的搜索结果
      const localResults = songs.filter(song => {
        const searchLower = query.toLowerCase()
        return (
          song.title.toLowerCase().includes(searchLower) ||
          song.artist.toLowerCase().includes(searchLower)
        )
      })
      setSearchResults(localResults)
    } finally {
      setIsSearching(false)
    }
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