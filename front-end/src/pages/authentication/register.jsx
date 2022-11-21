import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from '../../config'
import { fetchReq } from '../../fetchReq'

const Register = () => {
    const userData = useLocation()
    const passwordHolder = useRef('')
    const [passwordType, setPasswordType] = useState()
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
    })
    useEffect(() => { // Fills up the form with incoming state data from the login page except the password if it exists
        if (userData.state) {
            setUserCredentials(() => { return { ...userCredentials, ...userData.state, password: '' } })
        }
        // eslint-disable-next-line
    }, [userData])
    const handleChange = (item, newChange) => {
        // Updates the state with the info passed in.
        setUserCredentials(prevCredentials => {
            return {
                ...prevCredentials,
                [item]: newChange
            }
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()

        // Checks if the given data matches the regex pattern
        // Validates username.
        if (!USERNAME_PATTERN.test(userCredentials.username)) {
            throw new Error('Invalid Username') // TODO: need to handle properly
        }
        // Validates email
        if (!EMAIL_PATTERN.test(userCredentials.email)) {
            throw new Error('Invalid Email') // TODO: need to handle properly
        }
        // Validates password
        if (!PASSWORD_PATTERN.test(userCredentials.password)) {
            console.log(userCredentials.password)
            throw new Error('Invalid Password') // TODO: need to handle properly
        }


        const response = await fetchReq({
            url: 'auth/register',
            options: {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCredentials)
            }
        })
        // Reset the form
        if (response.err) { // If an error occurs
            console.log('An error as occured') // TODO: show a nice alert for error
            throw new Error(response.err)
        }
        setUserCredentials({ username: '', password: '', email: '' })
        const accessToken = response.token
        localStorage.setItem('token', accessToken) // TODO: change local storage to cookie.
        console.log('Successfully registered!')
    }

    const togglePasswordView = (e) => {
        e.preventDefault()
        const element = passwordHolder.current
        element.type = element.type === 'password' ? 'text' : 'password'
        setPasswordType(() => element.type) // For deciding on what icon to display
    }

    return (
        <>
            <h1>Register</h1>
            <form action="" method='POST' onSubmit={(e) => registerUser(e)}>
                <div className='w-full flex flex-col text-md max-w-xs'>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={userCredentials.username} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="username" maxLength={20} />
                </div>

                <div className='w-full flex flex-col text-md max-w-xs'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userCredentials.email} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="email" />
                </div>

                <div className='w-full flex flex-col text-md max-w-xs'>
                    <label htmlFor="password">Password</label>

                    <div className='w-full flex text-md max-w-xs flex-row items-center gap-2'>

                        <input ref={passwordHolder} type="password" name="password" value={userCredentials.password} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="password" />
                        {passwordType === 'text' ?
                            <svg onClick={(e) => togglePasswordView(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-12 cursor-pointer passwordIcon'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            :
                            <svg className='w-12 cursor-pointer passwordIcon' onClick={(e) => togglePasswordView(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                        }
                    </div>
                </div>

                <button>Register</button>
                <p>Already have an account? <Link to='../login' state={userCredentials}>Login</Link></p>
            </form>
        </>
    )
}

export default Register