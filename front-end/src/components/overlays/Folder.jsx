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
                <form action="" method="post">
                    <legend>Create Folder</legend>
                    <input type="text" placeholder='Name' />
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