import { NextPage } from 'next'
import { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'

const Logout: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        auth.signOut().then(() => {
            router.push('/')
        })
    }, [])

    return <></>
}

export default Logout
