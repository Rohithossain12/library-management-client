
import { Outlet } from 'react-router'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {


  return (
    <div>

      <Navbar />
      <div className="min-h-[calc(100vh-180px)] container mx-auto px-5">
        <Outlet />
      </div>

      <Footer />

    </div>
  )
}

export default App
