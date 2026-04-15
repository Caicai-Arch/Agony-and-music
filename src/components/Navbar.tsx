import React, { useState } from 'react'

interface NavbarProps {
  onSearch: (query: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-red-500 mr-8">音乐播放器</h1>
        </div>
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索歌曲、歌手、歌单..."
              className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              🔍
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">🔔</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <span className="text-xl">👤</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar