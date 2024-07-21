import React from 'react'
import Product from './components/Product'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import History from './components/History'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Product/>} />
      <Route path='/history' element={<History />} />     
      </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App