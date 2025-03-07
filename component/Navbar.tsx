"use client";
import React, { useCallback, useState } from 'react'
import NavbarItem from './NavbarItem'
import { FaAngleDown  } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi";
import MoblieMenu from './MoblieMenu';
import AccountMenu from './AccountMenu';

const Navbar = () => {
  const [showMoblieMenu, setShowMoblieMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleMoblieMenu = useCallback(()=> {
    setShowMoblieMenu((current)=>!current);
  },[])

  const toggleAccountMenu = useCallback(()=> {
    setShowAccountMenu((current)=>!current);
  },[])


  return (
    <nav
    className='
    w-full
    fixed
    z-40
    '
    >
    <div
    className='
    flex
    px-4
    md:px-16
    py-6
    flex-row
    transition
    items-center
    duration-500
    bg-opacity-90
    h-full
    '
    >
        
        <img className='h-4 lg:h-7' src="/image/netflix_logo.svg" alt="Avatar" />
        
        <div className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        ">
        <NavbarItem labels = 'Home' />
        <NavbarItem labels = 'Series' />
        <NavbarItem labels = 'Flims' />
        <NavbarItem labels = 'New & Popular' />
        <NavbarItem labels = 'My List' />
        <NavbarItem labels = 'Browse by languages' />

        </div>
        <div className="
        lg:hidden flex flex-row items-center gap-2
        ml-8 cursor-pointer
        relative
        "
        onClick={toggleMoblieMenu}
        >
          <p
          className='text-white text-sm'
          >
            Browse
          </p>
          <FaAngleDown className={`text-white transition ${showMoblieMenu ? 'rotate-180' : 'rotate-0'}`} />

          <MoblieMenu visible={showMoblieMenu}></MoblieMenu>
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center ">
          <div className="
          text-gray-200 hover:text-gray-300 cursor-pointer
          ">
            <IoSearchSharp></IoSearchSharp>
            
          </div>
          <div className="
          text-gray-200 hover:text-gray-300 cursor-pointer
          ">
            <HiOutlineBell></HiOutlineBell>
            
          </div>
          <div className=" flex flex-row items-center gap-2 cursor-pointer relative"
          onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rouded-md overflow-hidden bg-white">

            </div>
            <FaAngleDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
      </div>

    </div>
    
    </nav>
  )
}

export default Navbar
