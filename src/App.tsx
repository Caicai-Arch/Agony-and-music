import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import PlayerBar from './components/PlayerBar'
import ParticleEffect from './components/ParticleEffect'

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
      <PlayerBar />
      <ParticleEffect />
    </div>
  )
}

export default App