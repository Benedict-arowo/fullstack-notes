import React from 'react'
import { useItems, useSetItems } from '../contexts/ItemsContext'
import { useUser } from '../contexts/UseAuth'
import Select from 'react-select'
import { useFetch } from '../fetchReq'

const Header = () => {
    const customFetch = useFetch()
    const setItems = useSetItems()
    const user = useUser()
    const items = useItems()

    const handleChange = async (item) => {
        const { value } = item
        console.log(value)
        const response = await customFetch({
            url: `notes?sort=${value}`, options: {
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            }
        })
        const data = await response.json()
        setItems(() => data.data)
    }

    const selectOptions = [
        { value: 'updated', label: 'Updated' },
        { value: 'created', label: 'Created' },
        { value: 'title', label: 'Title' },
        { value: '-created', label: '-Created' },
        { value: '-updated', label: '-Updated' },
        { value: '-title', label: '-Title' },
    ]

    return (
        <>
            <h1 className='text-3xl font-bold dark:text-white text-blue-800 text-center capitalize'>{user ? `${user.username}'s Notes` : 'Notes'}</h1>

            <section className='mx-8 mt-4 xs:mx-0'>

                <input autoComplete='off' autoCorrect='false' type="text" name="Search" id="" className='w-full rounded-full py-2 px-4 hover:drop-shadow-lg focus:drop-shadow-lg' placeholder='Search...' />

                <section className='flex w-full items-top justify-between px-4 text-gray-500 dark:text-gray-100 items-center mt-1'>
                    <p>Currently displaying {items && items.length} item{items && items.length === 1 ? '' : 's'}.</p>
                    <Select onChange={(e) => handleChange(e)} options={selectOptions} defaultValue={selectOptions[1]} className='text-black w-36' />
                    {/* TODO: Maybe an api call to get all the sort options */}
                </section> 
            </section>
        </>
    )
}

export default Header