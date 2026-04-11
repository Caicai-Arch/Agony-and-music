import React from 'react'

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
        {mainItems.map((item, index) => (
          <div key={index} className="flex items-center p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-xl mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-400 mb-2 px-3">我的音乐库</h2>
        <div className="space-y-2">
          {libraryItems.map((item, index) => (
            <div key={index} className="flex items-center p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="space-y-2">
          {bottomItems.map((item, index) => (
            <div key={index} className="flex items-center p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar