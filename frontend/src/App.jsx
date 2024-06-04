import { Suspense, useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Send } from './pages/Send'
import { Inputbox } from './components/InputBox'
import './App.css'
import {BrowserRouter , Routes , Route , useNavigate} from "react-router-dom"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Inputbox title="Kedar" boxtext="chinna"></Inputbox>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Suspense fallback={"loading"}><Dashboard /></Suspense>}></Route>
          <Route path="/signin" element={<Suspense fallback={"loading"}><Signin /></Suspense>}></Route>
          <Route path="/signup" element={<Suspense fallback={"loading"}><Signup /></Suspense>}></Route>
          <Route path="/send" element={<Suspense fallback={"loading"}><Send /></Suspense>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
