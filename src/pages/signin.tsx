import { NextPage } from 'next'
import { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { isSignInWithEmailLink, signInWithEmailLink } from '@firebase/auth'
import { Container, Loader } from '@mantine/core'
import { useRouter } from 'next/router'

const Signin: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn')
            if (!email) {
                email = window.prompt(
                    '認証に使用したメールアドレスを入力してください',
                )
            }
            signInWithEmailLink(auth, email!, window.location.href)
                .then(() => {
                    window.localStorage.removeItem('emailForSignIn')
                    router.push('/app')
                })
                .catch((e) => {
                    console.error(e)
                    throw new Error('サインインに失敗しました')
                })
        }
    }, [])

    return (
        <Container>
            <Loader />
        </Container>
    )
}

export default Signin
