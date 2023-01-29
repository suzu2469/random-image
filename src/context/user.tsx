import { createContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'

export const userContext = createContext<ContextData>({
    user: null,
    isInitialized: false,
})

export type ContextData = {
    user: User | null
    isInitialized: boolean
}
type User = {
    uid: string
    name: string
    email: string
}
export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [init, setInit] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        return auth.onAuthStateChanged((value) => {
            setInit(true)
            if (!value) {
                setUser(null)
                return
            }
            setUser({
                uid: value.uid,
                email: value.email ?? '',
                name: value.displayName ?? '',
            })
        })
    }, [setInit, setUser])

    return (
        <userContext.Provider
            value={{
                user,
                isInitialized: init,
            }}
        >
            {children}
        </userContext.Provider>
    )
}
