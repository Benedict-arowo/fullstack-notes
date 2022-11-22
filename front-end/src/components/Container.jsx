import React from 'react'
import { Outlet } from 'react-router-dom'

const Container = () => {
    return (
        <div className='flex flex-row w-full h-full'>
            <Outlet />
        </div>
    )
}

export default Container