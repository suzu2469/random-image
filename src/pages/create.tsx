import CreateNewImage from '@/features/CreateNewImage'
import { Container } from '@mantine/core'
import LoginedRoute from '@/features/LoginedRoute'

const Create = () => {
    return (
        <LoginedRoute>
            <Container size="xs">
                <CreateNewImage />
            </Container>
        </LoginedRoute>
    )
}

export default Create
