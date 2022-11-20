import React from 'react'
import Sidebar from '../components/Sidebar'

const Index = () => {
    return (
        <div className='flex flex-row'>
            <Sidebar />
            <h1 className='text-3xl font-bold underline'>Howdy</h1>
        </div>
    )
}

export default Index