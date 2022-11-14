import React from 'react'
import Styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const nav = () => {
    return (
        <>
            <Container>
                nav
            </Container>

            <Outlet />
        </>
    )
}


const Container = Styled.div`
    width: 100%;
    background-color: red;
    padding: 8px 16px;
`

export default nav