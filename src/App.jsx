import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import {ToastContainer} from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Home />
      <ToastContainer />
    </div>
  )
}

export default App
