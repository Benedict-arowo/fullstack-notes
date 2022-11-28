import React from 'react'
import { useContext } from 'react';
import { createContext } from 'react';
import { useRef } from 'react';

const FolderProvider = createContext()
export const useFolder = () => useContext(FolderProvider)

const Folder = ({ children }) => {
    const FolderElement = useRef()
    const ItemElement = useRef()

    const showFolder = () => {
        FolderElement.current.style.cssText = 'display: flex; opacity: 0'

        setTimeout(() => {
            FolderElement.current.style.opacity = 1;
        }, 100);

    }

    const hideOverlay = (e) => {
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

    const showItem = () => {
        ItemElement.current.style.cssText = 'display: flex; opacity: 0'

        setTimeout(() => {
            ItemElement.current.style.opacity = 1;
        }, 100);
    }

    const toggleFolder = (mode) => {
        mode === 'folder' ? showFolder() : showItem();
    }

    return (
        <FolderProvider.Provider value={toggleFolder}>
            {children}
            <div ref={FolderElement} className='overlay grid place-content-center duration-300' onClick={hideOverlay}>
                <form action="" method="post" className='bg-blue-300 dark:bg-blue-800 rounded-md p-4 h-fit transition-all duration-500 px-4 py-4 w-1/2'>
                    <input autoComplete='off' autoCorrect='false' type="text" name="title" id="titke" placeholder='New Folder Title...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full hover:drop-shadow-lg active:drop-shadow-lg transition-all duration-300' />
                    {/* <p className='text-sm text-gray-800'>Currently displaying {0} folders.</p> */}
                </form>
            </div>

            <div ref={ItemElement} className='overlay grid place-content-center duration-300' onClick={hideOverlay}>
                <form action="" method="post">
                    <legend>Create Item</legend>
                    <input type="text" placeholder='Name' />
                </form>
            </div>

        </FolderProvider.Provider>
    )
}

export default Folder