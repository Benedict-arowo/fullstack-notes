import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
    return (
        <>
            <h1>Login</h1>
            <form action="">
                <section>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </section>

                <section>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                    <button id="showPassword"></button>
                </section>

                <button>Login</button>
                <p>Don&apos;t have an account? <Link to='../register'>Register</Link></p>
            </form>
        </>
    )
}

export default login