import React, { useEffect, useState } from 'react'
import { timeAgo } from '../config'
import { useItems, useSetItems } from '../contexts/ItemsContext'
import { useFetch } from '../fetchReq'

const ItemsComponent = () => {
    const Items = useItems()
    const setItems = useSetItems()
    const customFetch = useFetch()

    const fetchItems = async () => {
        const response = await customFetch({
            url: 'notes', options: {
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            }
        })
        const data = await response.json()
        setItems(() => data.data)
    }

    useEffect(() => {
        (async () => {
            await fetchItems()
        })()
        // eslint-disable-next-line
    }, [])

    const handleDelete = async (id) => {
        const response = await customFetch({
            url: `note/${id}`, options: {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }
        })
        const data = await response.json()
        console.log(data) // TODO: Show success message, and handling possible errors
        await fetchItems()
    }

    if (Items) {
        const itemsComponent = Items.map(item => {
            console.log(item)
            const timestamp = timeAgo(item.updatedAt)
            const populateTags = item.tags.map(tag => {
                return (
                    <p key={tag} className='bg-blue-300 dark:bg-blue-800 px-3 py-1 rounded-full cursor-pointer'>{tag}</p>
                )
            })

            return (
                <div key={item._id} className='bg-white text-gray-500 px-4 w-full py-2 h-40 rounded grid gap-y-2 min-w-container-min' >
                    {/* Header */}
                    <div className="flex justify-between flex-row items-center">
                        <p className='font-medium text-xl text-gray-600 truncate cursor-pointer'>{item.title}</p>
                        <div className='flex items-center gap-4'>
                            <p className='font-light text-sm text-gray-400 cursor-default'>{timestamp}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 hover:text-black duration-300 cursor-pointer" onClick={() => handleDelete(item._id)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>

                    </div>
                    {/* Body */}
                    <p className='text-sm line-clamp-3'>{item.note}</p>

                    {/* Footer */}
                    <div className="flex justify-between text-gray-100 items-end flex-wrap">
                        <div className="flex flex-row items-center gap-4 capitalize text-sm font-light">
                            {item.tags && populateTags}
                            {/* {tags} */}
                        </div>
                        <span className='bg-blue-300 dark:bg-blue-800 text-white hover:drop-shadow-lg cursor-pointer duration-500 px-3 py-1 rounded'>DEFAULT</span>
                    </div>
                </div>
            )
        })
        return (
            <>
                {itemsComponent.length === 0 ? <p className='text-white'>You currently have no notes.</p> : itemsComponent}
            </>
        )
    }
    else return (<h1>Something went wrong...</h1>)
}

export default ItemsComponent