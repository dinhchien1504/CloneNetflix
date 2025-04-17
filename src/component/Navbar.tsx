"use client";
import React, { useCallback, useState } from 'react'
import NavbarItem from './NavbarItem'
import { FaAngleDown  } from "react-icons/fa6";
import MoblieMenu from './MoblieMenu';
import AccountMenu from './AccountMenu';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const [showMoblieMenu, setShowMoblieMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { data: session } = useSession()
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
        <Link href={"/"}> 
        <Image className='h-4 lg:h-7' src="/image/netflix_logo.svg" alt="Avatar" width={100} height={100}/>
        </Link>
        
        <div className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        ">
        <Link href={"/"}>
        <NavbarItem labels = 'Home' />
        </Link>
        <NavbarItem labels = 'Series' />
        <NavbarItem labels = 'Films' />
        <NavbarItem labels = 'New & Popular' />
        <Link href={"/my-list"}>
          <NavbarItem labels = 'My List' />
        </Link>
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
        {session ?    
          <div className=" flex flex-row items-center gap-2 cursor-pointer relative"
          onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rouded-md overflow-hidden rounded-full">
              <Image src={"/image/avatar.png"} width={72} height={72} className='object-cover' alt='avatar'></Image>
            </div>
            <FaAngleDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          
      </div>  : <Link href={"/login"}>  <button
      className="bg-white text-black font-semibold py-3 px-8 rounded-full w-full sm:w-auto cursor-pointer"
    >
      Sign In
    </button></Link> }
      </div>

    </div>
    
    </nav>
  )
}

export default Navbar
