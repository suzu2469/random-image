import React, { useContext, useEffect } from 'react'
import { userContext } from '@/context/user'
import { useRouter } from 'next/router'
import { Center, Loader } from '@mantine/core'

export const NotLoginedRoute: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const router = useRouter()
    const user = useContext(userContext)

    useEffect(() => {
        if (!user.isInitialized) return
        if (user.user) {
            router.push('/app')
        }
    }, [user, router])

    if (!user.isInitialized)
        return (
            <Center style={{ height: '100vh' }}>
                <Loader />
            </Center>
        )
    return <>{children}</>
}
