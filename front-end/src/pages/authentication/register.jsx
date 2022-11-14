import React from 'react'
import { Link } from 'react-router-dom'

const register = () => {
    return (
        <>
            <h1>Register</h1>
            <form action="">
                <section>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </section>

                <section>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </section>

                <section>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                    <button id="showPassword"></button>
                </section>

                <button>Register</button>
                <p>Already have an account? <Link to='../login'>Login</Link></p>
            </form>
        </>
    )
}

export default register