import { useContext, useEffect } from 'react'
import { userContext } from '@/context/user'
import { useRouter } from 'next/router'

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

    return <>{children}</>
}
