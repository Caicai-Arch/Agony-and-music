import React, { useState } from 'react'

const Settings: React.FC = () => {
  const [quality, setQuality] = useState('high')
  const [autoplay, setAutoplay] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">设置</h1>
      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">播放设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>播放质量</span>
              <select 
                value={quality} 
                onChange={(e) => setQuality(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                <option value="low">低质量</option>
                <option value="medium">中等质量</option>
                <option value="high">高质量</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>自动播放</span>
              <input 
                type="checkbox" 
                checked={autoplay} 
                onChange={(e) => setAutoplay(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">通知设置</h2>
          <div className="flex items-center justify-between">
            <span>接收通知</span>
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">关于</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>版本</span>
              <span className="text-gray-400">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>更新日期</span>
              <span className="text-gray-400">2026-04-16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
