import React, { useEffect, useRef, useState } from 'react'
import { useSetTheme, useTheme } from '../contexts/ThemeContext'
import { useFolder } from './overlays/Folder'

const Sidebar = () => {
    const Folder = useFolder()
    const miniSearch = useRef()
    const searchOverlay = useRef()
    const mainSearch = useRef()
    const [sidebarToggled, setSidebarToggled] = useState(true)
    const [windowWidth, setWindowWidth] = useState(0)
    const minWidth = 1000 // For tablets and phones
    const theme = useTheme()
    const setTheme = useSetTheme()

    const showSearch = () => {
        searchOverlay.current.style.cssText = 'display: flex; opacity: 0'
        if (sidebarToggled) {
            miniSearch.current.style.cssText = `
            --tw-scale-x: 1.05;
            --tw-scale-y: 1.05;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));` // Adds an "active" effect
        }

        // Fade in effect.
        setTimeout(() => {
            searchOverlay.current.style.opacity = 1;
        }, 100);

        mainSearch.current.focus() // Sets focus on the main search.

        // Animate the search dialog.
    }

    const updateTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    const hideOverlay = (e) => {
        // Closes the overlay whenever its clicked.
        let classLists = e.target.className.split(' ')
        if (classLists.includes('overlay')) {
            const element = e.target
            element.style.cssText = 'opacity: 0; display: flex;'
            if (sidebarToggled) {
                miniSearch.current.style.cssText = '' // Removes the "active" effect.
            }
            // Fade out effect.
            setTimeout(() => {
                element.style.display = 'none';
            }, 100)
        }
    }

    window.addEventListener('resize', (e) => {
        const body = e.target
        if (body.innerWidth < minWidth) {
            setSidebarToggled(false)
        }
        setWindowWidth(body.innerWidth)
    })

    const handleSidebar = () => {
        setSidebarToggled(prev => !prev)
    }

    // Checks if the screen is big enough for the sidebar
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        if (window.innerWidth < minWidth) {
            setSidebarToggled(false)
        }
    }, [])

    const sidebarStyles = sidebarToggled ? 'max-w-sidebar w-1/5' : 'w-12'

    return (
        // w-12 when minimized
        <aside id='mainSidebar' className={`h-full bg-blue-300 dark:bg-blue-800 flex flex-col relative pt-4 overflow-hidden ${sidebarStyles} duration-500`} >
            {/* Arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 text-white absolute -top-1 right-1 hover:translate-x-2 cursor-pointer duration-300 ${windowWidth < minWidth ? 'hidden' : ''} ${sidebarToggled ? 'rotate-180' : ''}`} onClick={handleSidebar}>
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>

            {/* Header */}
            {sidebarToggled &&
                <h1 className='w-full text-center text-3xl text-blue-900 font-bold dark:text-gray-100'>Notes</h1>
            }
            <section className='mt-6 px-2'>
                {sidebarToggled ?
                    <input autoComplete='off' autoCorrect='false' type="text" name="Search" id="" className='w-full rounded-full py-2 px-4 hover:scale-105 duration-500' placeholder='Search Folders...' onClick={showSearch} ref={miniSearch} />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 cursor-pointer text-white hover:scale-105 duration-500" onClick={showSearch}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                }
            </section>

            {/* Main Options */}
            <section className={`flex gap-2 mt-2 flex-col duration-300 text-md text-slate-200 ${sidebarToggled ? 'p-4' : 'p-0 mt-12'}`}>
                {/* View All Items */}
                <section className={`hover:text-black cursor-pointer flex w-full flex-row items-center gap-3 ${!sidebarToggled ? 'justify-center' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <title>View all items</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    {sidebarToggled && <h3>View all items</h3>}
                </section>
                {/* Create New Folder */}
                <section onClick={() => Folder('folder')} className={`hover:text-black cursor-pointer flex w-full flex-row items-center gap-3 ${!sidebarToggled ? 'justify-center' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <title>Create a new folder.</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    {sidebarToggled && <h3>Create new folder</h3>}
                </section>
                {/* Create New Item */}
                <section onClick={() => Folder('item')} className={`hover:text-black cursor-pointer flex w-full flex-row items-center gap-3 ${!sidebarToggled ? 'justify-center' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <title>Create a new item.</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {sidebarToggled && <h3>Create new item</h3>}
                </section>
            </section>

            <div ref={searchOverlay} onClick={(e) => hideOverlay(e)} className='overlay duration-300 transition-all z-10'>
                {/* height: h-3/4 when folders are being dislplayed  */}
                <div className='bg-blue-300 dark:bg-blue-800 rounded-md p-4 w-1/2 h-fit transition-all duration-500'>
                    <input ref={mainSearch} autoComplete='off' autoCorrect='false' type="text" name="folderSearch" id="folderSearch" placeholder='Search folders...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full hover:drop-shadow-lg active:drop-shadow-lg transition-all duration-300' />
                    {/* <p className='text-sm text-gray-800'>Currently displaying {0} folders.</p> */}
                </div>
            </div>


            <footer className={`absolute bottom-0 w-full flex justify-between px-2 py-1 items-center text-slate-200 ${sidebarToggled ? 'bg-blue-400 flex-row dark:bg-blue-900' : ''}`}>
                {sidebarToggled && <p onClick={() => updateTheme()} className='font-bold cursor-pointer hover:text-blue-800 duration-500'>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>}
                <section className={`${sidebarToggled ? '' : 'flex flex-col-reverse gap-2'}`}>
                    <svg title='Settings' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:rotate-12 cursor-pointer duration-300">
                        <title>Settings</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {!sidebarToggled &&
                        <>
                            {theme === 'dark' ?
                                <svg onClick={() => updateTheme()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 cursor-pointer">
                                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                </svg>
                                :
                                <svg onClick={() => updateTheme()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            }
                        </>


                    }
                </section>
            </footer>
        </aside >
    )
}

export default Sidebar