import React from 'react'
import MainContent from '../components/MainContent'

interface HomeProps {
  songs: any[]
  playlists: any[]
  onPlaySong: (song: any) => void
}

const Home: React.FC<HomeProps> = ({ songs, playlists, onPlaySong }) => {
  return (
    <MainContent 
      songs={songs} 
      playlists={playlists} 
      onPlaySong={onPlaySong} 
    />
  )
}

export default Home
