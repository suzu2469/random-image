import type { NextPage } from 'next'
import Login from '@/features/Login'
import { Container } from '@mantine/core'
import { NotLoginedRoute } from '@/features/NotLoginedRoute'

const Home: NextPage = () => {
    return (
        <NotLoginedRoute>
            <Container size="xs">
                <Login />
            </Container>
        </NotLoginedRoute>
    )
}

export default Home
