import React from 'react'
import { useState } from 'react'
import ItemsComponent from '../components/ItemsComponent'
import Folder from '../components/overlays/Folder'
import Sidebar from '../components/Sidebar'
import { useUser } from '../contexts/UseAuth'

const Index = () => {
    const user = useUser()




    return (
        <Folder>
            <Sidebar />
            <main className='w-full h-full pt-4 bg-blue-100 overflow-y-scroll pb-4'>
                <h1 className='text-3xl font-bold text-blue-800 text-center capitalize'>{user ? `${user.username}'s Notes` : 'Notes'}</h1>

                <section className='mx-8 mt-4'>

                    <input autoComplete='off' autoCorrect='false' type="text" name="Search" id="" className='w-full rounded-full py-2 px-4 hover:drop-shadow-lg focus:drop-shadow-lg' placeholder='Search...' />

                    <section className='flex w-full items-top justify-between px-4 text-gray-500 items-center mt-1'>
                        <p>Currently displaying {2} items.</p>
                        <select name="sort list" id="sortlist" className='px-2 py-1 rounded-full border outline-none bg-blue-300 text-slate-100'>
                            <option value="updated" selected disabled>Sort By</option>
                            <option value="title">Title</option>
                            <option value="name">Name</option>
                            <option value="created">Created</option>
                            <option value="updated">Updated</option>
                            {/* TODO: Maybe an api call to get all the sort options */}
                        </select>
                    </section>
                </section>
                <section className='mt-10 px-8 flex flex-col gap-4 items-center'>
                    <ItemsComponent />
                </section>
            </main>
        </Folder>
    )
}

export default Index


    //     {/* Header */ }
    //     < div className = "flex justify-between flex-row items-center" >
    //                         <p className='font-medium text-xl text-gray-600 truncate'>Heading</p>
    //                         <p className='font-light text-sm text-gray-400'>30 mins ago</p>
    //                     </ >
    // {/* Body */ }
    // < p className = 'text-sm line-clamp-3' > Lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquid ullam cumque laborum praesentium iure quia modi officiis recusandae aliquam quibusdam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Recusandae labore totam cum.</ >

    //     {/* Footer */ }
    //     < div className = "flex justify-between text-gray-100 items-end" >
    //                         <div className="flex flex-row items-center gap-4 capitalize text-sm font-light">
    //                             <p className='bg-blue-300 px-3 py-1 rounded-full'>tag#1</p>
    //                             <p className='bg-blue-300 px-3 py-1 rounded-full'>tag#2</p>
    //                         </div>
    //                         <span className='bg-blue-300 text-white hover:drop-shadow-lg cursor-pointer duration-500 px-3 py-1 rounded'>Category</span>
    //                     </ >
    //                 </div >


    // <div className='bg-white text-gray-500 px-4 w-full py-2 h-40 rounded grid gap-y-2'>
    //     {/* Header */}
    //     <div className="flex justify-between flex-row items-center">
    //         <p className='font-medium text-xl text-gray-600 truncate'>Heading</p>
    //         <p className='font-light text-sm text-gray-400'>30 mins ago</p>
    //     </div>
    //     {/* Body */}
    //     <p className='text-sm line-clamp-3'>Lorem ipsum dolor sit Quidem dolore ipsam beatae distinctio doloribus aspernatur, iste pariatur dignissimos consequuntur eaque soluta eos eius. Tempore, sed fuga. Nisi quasi est eligendi nihil voluptate sequi quidem numquam, nostrum, accusantium, tempora asperiores! Porro velit recusandae mollitia doloribus odio cum! Tempore nisi inventore blanditiis! Corporis recusandae neque enim sit aliquid voluptatibus nostrum repudiandae, laudantium eos! Ex architecto ipsa deserunt ut, nemo blanditiis delectus quam quae odio itaque, nihil incidunt, laboriosam nisi. Iste nemo quo, quidem obcaecati aliquid facilis accusamus nisi vitae ad iure, alias repudiandae esse? Quasi odio incidunt nam ut vel exercitationem, suscipit assumenda omnis modi.</p>

    //     {/* Footer */}
    //     <div className="flex justify-between text-gray-100 items-end">
    //         <div className="flex flex-row items-center gap-4 capitalize text-sm font-light">
    //             <p className='bg-blue-300 px-3 py-1 rounded-full'>tag#1</p>
    //             <p className='bg-blue-300 px-3 py-1 rounded-full'>tag#2</p>
    //         </div>
    //         <span className='bg-blue-300 text-white hover:drop-shadow-lg cursor-pointer duration-500 px-3 py-1 rounded'>Category</span>
    //     </div>
    // </div>