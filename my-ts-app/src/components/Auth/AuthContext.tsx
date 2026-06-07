import {createContext, useContext, useState, type ReactNode,} from 'react'
import { deleteCookie, getCookie, setCookie } from './cookies'
import { logout as logoutRequest } from './authApi'

type AuthContextType = {
    token: string | null
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext =
    createContext<AuthContextType | null>(null)

export function AuthProvider({children,}: AuthProviderProps) {

    const [token, setToken] =
        useState<string | null>(
            getCookie('accessToken')
        )

    const login = (token: string) => {
        setCookie('accessToken', token)
        setToken(token)
    }

    const logout = async () => {
        try {
            await logoutRequest()
        } catch {
            // State cleanup should happen even if backend is unavailable.
        }

        deleteCookie('accessToken')
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        )
    }

    return context
}

