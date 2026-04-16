import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PlayerBar from './components/PlayerBar'
import ParticleEffect from './components/ParticleEffect'
import Navbar from './components/Navbar'
import LyricsDisplay from './components/LyricsDisplay'
import Home from './pages/Home'
import MyMusic from './pages/MyMusic'
import Settings from './pages/Settings'
import Lyrics from './pages/Lyrics'
import { supabase } from './lib/supabase'

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  duration: string
  url: string
  lyrics?: string
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
  const [showLyrics, setShowLyrics] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
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
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            lyrics: '[00:00.00]The club isn\'t the best place to find a lover\n[00:03.00]So the bar is where I go\n[00:06.00]Me and my friends at the table doing shots\n[00:09.00]Drinking fast and then we talk slow\n[00:12.00]Come over and start up a conversation with just me\n[00:15.00]And trust me I\'ll give it a chance now\n[00:18.00]Take my hand, stop, put Van the Man on the jukebox\n[00:21.00]And then we start to dance, and now I\'m singing like\n[00:24.00]Girl, you know I want your love\n[00:27.00]Your love was handmade for somebody like me\n[00:30.00]Come on now, follow my lead\n[00:33.00]I may be crazy, don\'t mind me\n[00:36.00]Say, boy, let\'s not talk too much\n[00:39.00]Grab on my waist and put that body on me\n[00:42.00]Come on now, follow my lead\n[00:45.00]Come, come on now, follow my lead\n[00:48.00]I\'m in love with the shape of you\n[00:51.00]We push and pull like a magnet do\n[00:54.00]Although my heart is falling too\n[00:57.00]I\'m in love with your body\n[01:00.00]And last night you were in my room\n[01:03.00]And now my bedsheets smell like you\n[01:06.00]Every day discovering something brand new\n[01:09.00]I\'m in love with your body\n[01:12.00]Oh—I—oh—I—oh—I—oh—I\n[01:15.00]I\'m in love with your body\n[01:18.00]Oh—I—oh—I—oh—I—oh—I\n[01:21.00]I\'m in love with your body\n[01:24.00]Oh—I—oh—I—oh—I—oh—I\n[01:27.00]I\'m in love with your body\n[01:30.00]Every day discovering something brand new\n[01:33.00]I\'m in love with the shape of you'
          },
          {
            id: 2,
            title: 'Jar Of Love',
            artist: '曲婉婷',
            cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20Jar%20Of%20Love%20dark%20theme&image_size=square',
            duration: '3:00',
            url: 'https://pub-12fc31f50c7e427a8bf85d595cb1a92e.r2.dev/Jar Of Love.mp3',
            lyrics: '[00:00.00]是谁导演这场戏\n[00:05.00]在这孤单角色里\n[00:10.00]对白总是自言自语\n[00:15.00]对手都是回忆\n[00:20.00]看不出什么结局\n[00:25.00]自始至终全是你\n[00:30.00]让我投入太彻底\n[00:35.00]故事如果注定悲剧\n[00:40.00]何苦给我美丽\n[00:45.00]演出相聚和别离\n[00:50.00]没有星星的夜里\n[00:55.00]我用泪光吸引你\n[01:00.00]既然爱你不能言语\n[01:05.00]只能微笑哭泣\n[01:10.00]让我从此忘了你\n[01:15.00]没有星星的夜里\n[01:20.00]我把往事留给你\n[01:25.00]如果一切只是演戏\n[01:30.00]要你好好看戏\n[01:35.00]心碎只是我自己\n[01:40.00]没有星星的夜里\n[01:45.00]我用泪光吸引你\n[01:50.00]既然爱你不能言语\n[01:55.00]只能微笑哭泣\n[02:00.00]让我从此忘了你\n[02:05.00]没有星星的夜里\n[02:10.00]我把往事留给你\n[02:15.00]如果一切只是演戏\n[02:20.00]要你好好看戏\n[02:25.00]心碎只是我自己'
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
    console.log('Playing song:', song)
    console.log('Audio URL:', song.url)
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

  // 监听音频事件
  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime)
    }

    audioElement.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  // 切换歌词显示
  const toggleLyrics = () => {
    setShowLyrics(!showLyrics)
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
          name: '曲婉婷 - Jar Of Love.mp3',
          url: `${r2Endpoint}/曲婉婷 - Jar Of Love.mp3`,
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
        
        // 尝试从文件名中提取歌手和歌名（格式：歌手 - 歌名.mp3）
        let title = fileName.replace(/\.mp3$/, '')
        let artist = '未知'
        
        // 检查文件名是否包含" - "分隔符
        const separatorIndex = title.indexOf(' - ')
        if (separatorIndex > -1) {
          artist = title.substring(0, separatorIndex)
          title = title.substring(separatorIndex + 3)
        }
        
        // 确保URL正确编码
        const encodedUrl = encodeURI(file.url)
        
        return {
          id: songs.length + index + 1,
          title,
          artist,
          cover: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20${encodeURIComponent(title)}%20dark%20theme&image_size=square`,
          duration: '3:00',
          url: encodedUrl
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

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            {/* 移动端汉堡菜单按钮 */}
            <button 
              className="md:hidden mr-4 text-xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="text-xl font-bold text-red-500">音乐播放器</h1>
          </div>
          <Navbar onSearch={handleSearch} />
        </div>
        
        {/* 主内容区 */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* 侧边栏 - 移动端滑出式 */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:z-0
          `}>
            <div className="h-full">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center md:hidden">
                <h2 className="font-bold">菜单</h2>
                <button 
                  className="text-xl"
                  onClick={() => setSidebarOpen(false)}
                >
                  ×
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
          
          {/* 移动端遮罩 */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          {/* 主要内容 */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    songs={isSearching ? [] : (searchQuery ? searchResults : songs)} 
                    playlists={playlists} 
                    onPlaySong={playSong} 
                  />
                } 
              />
              <Route 
                path="/my-music" 
                element={
                  <MyMusic 
                    songs={songs} 
                    onPlaySong={playSong} 
                  />
                } 
              />
              <Route path="/settings" element={<Settings />} />
              <Route 
                path="/lyrics" 
                element={
                  <Lyrics 
                    currentSong={currentSong} 
                  />
                } 
              />
            </Routes>
          </div>
        </div>
        
        {/* 歌词显示 */}
        {showLyrics && currentSong && (
          <div className="fixed bottom-24 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-30">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">歌词</h3>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={toggleLyrics}
                >
                  ×
                </button>
              </div>
              <LyricsDisplay 
                currentLyrics={currentSong.lyrics || ''} 
                currentTime={currentTime} 
              />
            </div>
          </div>
        )}
        
        {/* 底部播放器 */}
        <PlayerBar 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          onTogglePlay={togglePlay} 
          onToggleLyrics={toggleLyrics}
          audioRef={audioRef} 
        />
        
        <ParticleEffect />
        <audio ref={audioRef} className="hidden" />
      </div>
    </Router>
  )
}

export default App