import React from 'react'
import { Outlet } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className='bg-blue-400'>
                Nav
            </div>
            <div className='flex flex-row w-full h-full'>
                <Outlet />
            </div>

        </div>
    )
}

export default Nav