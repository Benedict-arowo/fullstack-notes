import React from 'react'

const Sidebar = () => {
    return (
        // w-12 when minimized
        <div className='h-screen bg-blue-300 w-1/6 py-4'>
            <section className='px-4 pt-4 flex gap-2 flex-col duration-300 text-xl text-gray-600'>
                <h3 className='hover:text-black cursor-pointer'>View all items</h3>
                <h3 className='hover:text-black cursor-pointer'>Create new item</h3>
                <h3 className='hover:text-black  cursor-pointer'>Create new folder</h3>
            </section>
            <section className='mt-24 px-2'>
                <input type="text" name="Search" id="" className='w-full rounded-full py-2 px-4' placeholder='Search Folders...' />
                {/* Expanded Search */}
                <div className='overlay hidden'>
                    {/* height: h-3/4 when folders are being dislplayed  */}
                    <div className='bg-blue-300 rounded-md min-h-24 p-4 w-1/2 h-fittransition-all duration-300'>
                        <input type="text" name="folderSearch" id="folderSearch" placeholder='Search folders...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full focus:drop-shadow-md transition-all duration-300' />
                        {/* <p className='text-sm text-gray-800'>Currently displaying {0} folders.</p> */}
                    </div>
                </div>
                <h1>Howdy</h1>
            </section>
        </div>
    )
}

export default Sidebar