import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { userContext } from '@/context/user'

const LoginedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const user = useContext(userContext)

    useEffect(() => {
        if (!user.isInitialized) return
        if (!user.user) {
            router.push('/')
        }
    }, [user, router])

    return <>{children}</>
}

export default LoginedRoute
