import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const mainItems = [
    { name: '首页', icon: '🏠' },
    { name: '我的', icon: '👤' },
    { name: '社区', icon: '🌍' }
  ]

  const libraryItems = [
    { name: '歌单', icon: '📋' },
    { name: '专辑', icon: '💿' },
    { name: '歌手', icon: '🎤' },
    { name: '视频', icon: '🎬' }
  ]

  const bottomItems = [
    { name: '设置', icon: '⚙️' },
    { name: '意见反馈', icon: '💬' },
    { name: '关于', icon: 'ℹ️' }
  ]

  return (
    <div className="w-64 bg-gray-900 h-full border-r border-gray-800 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-500">音乐播放器</h1>
      </div>
      
      <div className="space-y-2 mb-8">
        {mainItems.map((item, index) => {
          let path = '/'
          if (item.name === '首页') path = '/'
          else if (item.name === '我的') path = '/my-music'
          else if (item.name === '社区') path = '/community'
          
          return (
            <Link key={index} to={path} className="flex items-center p-3 rounded-md hover:bg-gray-800 transition-colors">
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-400 mb-2 px-3">我的音乐库</h2>
        <div className="space-y-2">
          {libraryItems.map((item, index) => {
            let path = '/'
            if (item.name === '歌单') path = '/playlists'
            else if (item.name === '专辑') path = '/albums'
            else if (item.name === '歌手') path = '/artists'
            else if (item.name === '视频') path = '/videos'
            
            return (
              <Link key={index} to={path} className="flex items-center p-3 rounded-md hover:bg-gray-800 transition-colors">
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="space-y-2">
          {bottomItems.map((item, index) => {
            let path = '/'
            if (item.name === '设置') path = '/settings'
            else if (item.name === '意见反馈') path = '/feedback'
            else if (item.name === '关于') path = '/about'
            
            return (
              <Link key={index} to={path} className="flex items-center p-3 rounded-md hover:bg-gray-800 transition-colors">
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar