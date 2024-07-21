import React from 'react'
import { Link } from 'react-router-dom'
import { GoHistory } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className='bg-[#ffd3b6] p-3 flex justify-between items-center '>
        <div>
        <h1 className='text-base md:text-xl font-bold'>Amazon Price Tracker</h1>
        </div>
        <div className='flex gap-3'>
        <Link to={'/'}><div className='flex items-center gap-2 text-sm font-bold'><IoPricetagsOutline /><h3>Track Price</h3></div></Link>
        <Link  to={'/history'}><div className='flex items-center gap-2 text-sm font-bold'><GoHistory /><h3>History</h3></div></Link>
        </div>
    </div>
  )
}

export default Navbar