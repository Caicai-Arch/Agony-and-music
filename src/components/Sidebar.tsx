import React from 'react'

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: '发现音乐', icon: '🎵' },
    { name: '我的音乐', icon: '🎧' },
    { name: '朋友', icon: '👥' },
    { name: '播客', icon: '🎙️' },
    { name: '视频', icon: '🎬' },
    { name: '本地音乐', icon: '💽' },
    { name: '下载管理', icon: '⬇️' },
    { name: '最近播放', icon: '⏰' },
    { name: '我的收藏', icon: '⭐' },
    { name: '歌手', icon: '🎤' },
    { name: '专辑', icon: '💿' },
    { name: '歌单', icon: '📋' }
  ]

  return (
    <div className="w-64 bg-gray-900 h-full border-r border-gray-800 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-500">音乐播放器</h1>
      </div>
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-xl mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-gray-800">
        <div className="p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
          <span className="text-xl mr-3">➕</span>
          <span>创建歌单</span>
        </div>
        <div className="p-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
          <span className="text-xl mr-3">📁</span>
          <span>本地和下载</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar