import React, { useEffect, useState } from 'react'
import { useFetch } from '../fetchReq'

const ItemsComponent = () => {
    const customFetch = useFetch()
    const [Items, setItems] = useState([])

    useEffect(() => {
        (async () => {
            const response = await customFetch({
                url: 'notes', options: {
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                }
            })
            const data = await response.json()
            setItems(() => data.data)
        })()
        // eslint-disable-next-line
    }, [])

    if (Items) {
        const itemsComponent = Items.map(item => {
            // const tags = item.tags.map(tag => {
            //     return (
            //         <p className='bg-blue-300 px-3 py-1 rounded-full'>{tag}</p>
            //     )
            // })

            return (
                <div key={item._id} className='bg-white text-gray-500 px-4 w-full py-2 h-40 rounded grid gap-y-2 min-w-container-min' >
                    {/* Header */}
                    <div className="flex justify-between flex-row items-center">
                        <p className='font-medium text-xl text-gray-600 truncate cursor-pointer'>{item.title}</p>
                        <p className='font-light text-sm text-gray-400 cursor-default'>{item.timestamp}</p>
                    </div>
                    {/* Body */}
                    <p className='text-sm line-clamp-3'>{item.note}</p>

                    {/* Footer */}
                    <div className="flex justify-between text-gray-100 items-end flex-wrap">
                        <div className="flex flex-row items-center gap-4 capitalize text-sm font-light">
                            <p className='bg-blue-300 dark:bg-blue-800 px-3 py-1 rounded-full cursor-pointer'>tag1</p>
                            {/* {tags} */}
                        </div>
                        <span className='bg-blue-300 dark:bg-blue-800 text-white hover:drop-shadow-lg cursor-pointer duration-500 px-3 py-1 rounded'>DEFAULT</span>
                    </div>
                </div>
            )
        })
        return (
            <>
                {itemsComponent.length === 0 ? <p>Empty</p> : itemsComponent}
            </>
        )
    }
    else return (<h1>Something went wrong...</h1>)
}

export default ItemsComponent