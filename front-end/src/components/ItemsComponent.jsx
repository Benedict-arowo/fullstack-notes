import React, { useEffect, useState } from 'react'
import { fetchReq } from '../fetchReq'

const ItemsComponent = () => {
    const [Items, setItems] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetchReq({
                url: '/notes', options: {
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                }
            })
            setItems(() => response.data)
            console.log(response)
        })()
    }, [])

    if (Items) {
        const itemsComponent = Items.map(item => {
            // const tags = item.tags.map(tag => {
            //     return (
            //         <p className='bg-blue-300 px-3 py-1 rounded-full'>{tag}</p>
            //     )
            // })

            return (
                <div key={item._id} className='bg-white text-gray-500 px-4 w-full py-2 h-40 rounded grid gap-y-2' >
                    {/* Header */}
                    <div className="flex justify-between flex-row items-center">
                        <p className='font-medium text-xl text-gray-600 truncate'>{item.title}</p>
                        <p className='font-light text-sm text-gray-400'>{item.timestamp}</p>
                    </div>
                    {/* Body */}
                    <p className='text-sm line-clamp-3'>{item.note}</p>

                    {/* Footer */}
                    <div className="flex justify-between text-gray-100 items-end">
                        <div className="flex flex-row items-center gap-4 capitalize text-sm font-light">
                            <p className='bg-blue-300 px-3 py-1 rounded-full'>tag1</p>
                            {/* {tags} */}
                        </div>
                        <span className='bg-blue-300 text-white hover:drop-shadow-lg cursor-pointer duration-500 px-3 py-1 rounded'>DEFAULT</span>
                    </div>
                </div>
            )
        })
        return (
            <>
                {itemsComponent}
            </>
        )
    }
    else return (<h1>Something went wrong...</h1>)
}

export default ItemsComponent