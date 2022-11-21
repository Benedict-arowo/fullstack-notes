import React, { useRef } from 'react'

const Sidebar = () => {
    const miniSearch = useRef()
    const searchOverlay = useRef()
    const mainSearch = useRef()



    const showSearch = () => {
        searchOverlay.current.style.cssText = 'display: flex; opacity: 0'

        // Fade in effect.
        setTimeout(() => {
            searchOverlay.current.style.opacity = 1;
        }, 100);

        mainSearch.current.focus() // Sets focus on the main search.

        // Animate the search dialog.
    }

    const hideOverlay = (e) => {
        // Closes the overlay whenever its clicked.
        let classLists = e.target.className.split(' ')
        if (classLists.includes('overlay')) {
            const element = e.target
            element.style.cssText = 'opacity: 0; display: flex;'
            // Fade out effect.
            setTimeout(() => {
                element.style.display = 'none';
            }, 100)
        }
    }

    return (
        // w-12 when minimized
        <div className='h-screen bg-blue-300 w-1/6 py-4'>
            <section className='px-4 pt-4 flex gap-2 flex-col duration-300 text-xl text-gray-600'>
                <div className='flex w-full flex-row justify-between'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <h3 className='hover:text-black  cursor-pointer'>Create new folder</h3>
                </div>
                <h3 className='hover:text-black cursor-pointer'>View all items</h3>
                <h3 className='hover:text-black cursor-pointer'>Create new item</h3>
            </section>
            <section className='mt-24 px-2'>
                <input type="text" name="Search" id="" className='w-full rounded-full py-2 px-4' placeholder='Search Folders...' onClick={showSearch} ref={miniSearch} />
                {/* Expanded Search */}
                <div ref={searchOverlay} onClick={(e) => hideOverlay(e)} className='overlay duration-300 transition-all'>
                    {/* height: h-3/4 when folders are being dislplayed  */}
                    <div className='bg-blue-300 rounded-md p-4 w-1/2 h-fit transition-all duration-500'>
                        <input ref={mainSearch} type="text" name="folderSearch" id="folderSearch" placeholder='Search folders...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full focus:drop-shadow-md transition-all duration-300' />
                        {/* <p className='text-sm text-gray-800'>Currently displaying {0} folders.</p> */}
                    </div>
                </div>
                <h1>Howdy</h1>
            </section>
        </div>
    )
}

export default Sidebar