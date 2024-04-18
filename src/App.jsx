import{Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {useAutoKeys} from 'react-easier'; 

import './App.css'
import Login from './Login';
import DefaultPage from './DefaultPage'
import ExternalPage from './ExternalPage'




function App() {
 // const [count, setCount] = useState(0)
 useAutoKeys();


  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/default-page" element={<DefaultPage/>}></Route>
        <Route path="/external-page" element={<ExternalPage/>}></Route>

      </Routes>
      
      </div>  
    </>
  )
}

export default App
