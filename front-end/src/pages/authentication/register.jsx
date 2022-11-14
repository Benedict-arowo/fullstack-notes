import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchReq } from '../../fetchReq'

const Register = () => {
    let passwordHolder = useRef('')
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
    })

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
    }

    return (
        <>
            <h1>Register</h1>
            <form action="" onSubmit={(e) => registerUser(e)}>
                <section>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={userCredentials.username} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="username" />
                </section>

                <section>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userCredentials.email} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="email" />
                </section>

                <section>
                    <label htmlFor="password">Password</label>
                    <input ref={passwordHolder} type="password" name="password" value={userCredentials.password} onChange={e => handleChange(e.currentTarget.name, e.target.value)} id="password" />
                    <button onClick={(e) => togglePasswordView(e)} id="showPassword">show password</button>
                </section>

                <button>Register</button>
                <p>Already have an account? <Link to='../login'>Login</Link></p>
            </form>
        </>
    )
}

export default Register