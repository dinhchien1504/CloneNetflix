import React from 'react'

interface NavbarItemProps {
    labels : string;
}

const NavbarItem =  (props:NavbarItemProps) => {
    const {labels} = props

  return (
    <div 
    className='
    text-white
    flex
    p-4 
    justify-center
    hover:text-grey-300
    cursor-pointer
    transition

    '
    >
    {labels}
    </div>
  )
}

export default NavbarItem
