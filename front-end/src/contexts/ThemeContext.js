import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeProvider = createContext()
const useThemeProvider = createContext()

export const useTheme = () => useContext(ThemeProvider)
export const useSetTheme = () => useContext(useThemeProvider)

const ThemeContext = ({ children }) => {
    const [theme, setTheme] = useState()

    const updateTheme = (mode) => {
        if (mode === 'dark' || mode === 'light' || !mode) {
            setTheme(mode)
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme])

    return (
        <ThemeProvider.Provider value={theme}>
            <useThemeProvider.Provider value={updateTheme}>
                {children}
            </useThemeProvider.Provider>
        </ThemeProvider.Provider>
    )
}

export default ThemeContext