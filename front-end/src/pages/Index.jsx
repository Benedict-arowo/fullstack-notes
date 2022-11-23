import React from 'react'
import Sidebar from '../components/Sidebar'


const Index = () => {
    return (
        <>
            <Sidebar />
            <main className='w-full h-full pt-4 bg-blue-100'>
                <h1 className='text-3xl font-bold text-blue-800 text-center'>My Notes</h1>

                <section className='mx-8 mt-4'>

                    <input autoComplete='off' autoCorrect='false' type="text" name="Search" id="" className='w-full rounded-full py-2 px-4 hover:drop-shadow-lg active:drop-shadow-lg' placeholder='Search...' />

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
            </main>
        </>
    )
}

export default Index