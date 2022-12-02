import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useRef } from 'react';
import { useFetch } from '../../fetchReq';
import Select from 'react-select'
import { useEffect } from 'react';


const OverlaysProvider = createContext()
export const useOverlays = () => useContext(OverlaysProvider)

const Overlays = ({ children }) => {
    const customFetch = useFetch()
    const FolderElement = useRef()
    const ItemElement = useRef()
    const [ folderComponent, setFolderComponent ] = useState({
        folder: '',
        color: '#ffffff'
    })
    const [ itemComponent, setItemComponent ] = useState({
        name: '',
        folder: '',
        folderId: '',
        note: '',
        mode: '',
    })
    const modeList = [
        { value: 'plain', label: 'Plain'},
        { value: 'markdown', label: 'Markdown'}
    ]

    const [folderList, setFolderList] = useState() 

    const showFolder = () => {
        FolderElement.current.style.cssText = 'display: flex; opacity: 0'

        setTimeout(() => {
            FolderElement.current.style.opacity = 1;
        }, 100);

    }

    const updateFolderComponent = ({item, newValue}) => {
        setFolderComponent(prev => {
            return {
                ...prev,
                [`${item}`]: newValue
            };
        })

        setTimeout(() => {
            console.log(folderComponent)
        }, 100)
    }

    const updateItemComponent = ({item, newValue}) => {
        if (item === 'folder') {
            setItemComponent(prev => {
                return {
                    ...prev,
                    folderId: newValue.value,
                    folder: newValue.label
                };
            })
            return
        }
        else if (item === 'mode') {
            setItemComponent(prev => {
                return {
                    ...prev,
                    mode: newValue.value,
                };
            })
            return
        }

        setItemComponent(prev => {
            return {
                ...prev,
                [`${item}`]: newValue
            };
        })

        setTimeout(() => {
            console.log(itemComponent)
        }, 100)
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

    const newItem = async (event) => {
        event.preventDefault();
        // name: '',
        // folder: '',
        // folderId: '',
        // note: '',
        const response = await customFetch({url: 'notes', options: {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            body: JSON.stringify({ title: itemComponent.name, note: itemComponent.note, folderName: itemComponent.folder, folderId: itemComponent.folderId })
        }})

        const data = await response.json()
        console.log(data)
    }

    const newFolder = async (event) => {
        event.preventDefault();
        const response = await customFetch({url: 'folders', options: {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            body: JSON.stringify({
                name: folderComponent.folder,
                color: folderComponent.color
            })
        }})

        const data = await response.json()

        FolderElement.current.click() // Simulates a click on the FolderElement element, causing the Overlay to be hidden.
        updateFolderComponent({newValue: '', item: 'folder'})
        updateFolderComponent({newValue: '', item: 'color'})
    }
    
    useEffect(() => {
        (async () => {
            const response = await customFetch({url: 'folders', options: {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')}
            }})
            const data = await response.json()
            console.log(data)
            let folderlist = data.map(item => {
                return {
                    value: item._id,
                    label: item.name
                }
            })
            folderlist.unshift({value: 'none', label: 'none'})
            setFolderList(folderlist)
        })()
    }, [])

    // console.log(folderList)


    return (
        <OverlaysProvider.Provider value={toggleFolder}>
            {children}
            <div ref={FolderElement} className='overlay grid place-content-center duration-300' onClick={hideOverlay}>
                <form action="" onSubmit={newFolder} className='bg-blue-300 dark:bg-blue-800 rounded-md p-4 h-fit transition-all duration-500 px-4 py-4 w-1/2'>
                    <input autoComplete='off' autoCorrect='false' type="text" name="title" id="titke" placeholder='New Folder Title...' className='rounded-full px-6 py-4 text-2xl text-gray-600 w-full hover:drop-shadow-lg active:drop-shadow-lg transition-all duration-300' value={folderComponent.folder} onChange={(e) => updateFolderComponent({newValue: e.currentTarget.value, item: 'folder'})}/>
                    <section className='mt-2 flex flex-row items-center justify-start gap-2 ml-4'>
                        <p className='text-xl font-medium text-slate-200'>Color: </p>
                        <input type="color" name="folder-color" className='cursor-pointer' id="folder-color" value={folderComponent.color} onChange={(e) => updateFolderComponent({newValue: e.currentTarget.value, item: 'color'})} />
                    </section>
                </form>
            </div>

            <div ref={ItemElement} className='overlay grid place-content-center duration-300' onClick={hideOverlay}>
                <form action="" onSubmit={newItem} method="post" className='flex flex-col gap-4'>
                    <legend>Create Item</legend>
                    <input value={itemComponent.name} onChange={(e) => updateItemComponent({newValue: e.currentTarget.value, item: 'name'})} type="text" placeholder='Name' />
                    <textarea value={itemComponent.note} onChange={(e) => updateItemComponent({newValue: e.currentTarget.value, item: 'note'})} name="note" cols="30" rows="10"></textarea>
                    <Select onChange={(e) => updateItemComponent({newValue: e, item: 'folder'})} options={folderList} />
                    <Select onChange={(e) => updateItemComponent({newValue: e, item: 'mode'})} options={modeList} />
                    <button type="submit">Submit</button>
                </form>
                {/* onChange={(e) => handleChange(e)}  */}
                {/* defaultValue={folderList[0]} */}
            </div>

        </OverlaysProvider.Provider>
    )
}

export default Overlays