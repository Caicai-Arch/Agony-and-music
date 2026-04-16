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
    <div className="flex items-center flex-1 max-w-md mx-4">
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、歌单..."
          className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
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
  )
}

export default Navbar