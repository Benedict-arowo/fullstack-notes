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
        <aside className='h-full bg-blue-300 w-1/6 min-w-sidebar flex flex-col relative'>
            {/* Header */}
            <h1 className='w-full text-center text-3xl text-blue-900 font-bold'>Notes</h1>

            {/* Search Component */}
            <section className='mt-6 px-2'>
                <input autoComplete='off' autoCorrect='false' type="text" name="Search" id="" className='w-full rounded-full py-2 px-4' placeholder='Search Folders...' onClick={showSearch} ref={miniSearch} />
                {/* Expanded Search */}
                <div ref={searchOverlay} onClick={(e) => hideOverlay(e)} className='overlay duration-300 transition-all z-10'>
                    {/* height: h-3/4 when folders are being dislplayed  */}
                    <div className='bg-blue-300 rounded-md p-4 w-1/2 h-fit transition-all duration-500'>
                        <input ref={mainSearch} autoComplete='off' autoCorrect='false' type="text" name="folderSearch" id="folderSearch" placeholder='Search folders...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full focus:drop-shadow-md transition-all duration-300' />
                        {/* <p className='text-sm text-gray-800'>Currently displaying {0} folders.</p> */}
                    </div>
                </div>
            </section>

            {/* Main Options */}
            <section className='px-4 pt-4 flex gap-2 mt-2 flex-col duration-300 text-md text-blue-800'>
                {/* View All Items */}
                <section className="hover:text-black cursor-pointer flex w-full flex-row items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    <h3>View all items</h3>
                </section>
                {/* Create New Folder */}
                <section className='hover:text-black cursor-pointer flex w-full flex-row items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <h3>Create new folder</h3>
                </section>
                {/* Create New Item */}
                <section className="hover:text-black cursor-pointer flex w-full flex-row items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3>Create new item</h3>
                </section>
            </section>

            <footer className='absolute bottom-0 w-full bg-blue-400 flex flex-row justify-between px-2 py-1 items-center text-white'>
                <p className='font-bold cursor-pointer hover:text-blue-800 duration-500'>Dark Mode</p>
                <section>
                    <svg title='Settings' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:rotate-12 cursor-pointer duration-300">
                        <title>Settings</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </section>
            </footer>
        </aside>
    )
}

export default Sidebar