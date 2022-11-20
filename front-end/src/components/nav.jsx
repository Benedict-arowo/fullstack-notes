import React from 'react'
import { Outlet } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <div className='bg-blue-400'>
                Nav
            </div>

            <Outlet />
        </>
    )
}

export default Nav