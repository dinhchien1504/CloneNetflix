import React from 'react'
interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
  if (!visible)
  {
    return null;
  }
    return (
        <div className='
         flex-col w-56 absolute bg-black top-14 right-0 py-5 border-2 border-gray-600 
        '>
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <p className='text-white text-sm group-hover/item:underline'> 
                    UserName
                    </p>
                    
                </div>
                <hr
                className='bg-gray-600 border-0 h-px my-4'
                />

                    <div className="px-3 text-center text-white text-sm hover:underline">
                        Sign Out
                    </div>
            </div>
      
        </div>
    )
}

export default AccountMenu
