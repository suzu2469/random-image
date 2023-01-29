import { NextPage } from 'next'
import { Container } from '@mantine/core'
import ImageResult from '@/features/ImageResult'

type Props = {
    path: string
}
const ImagesFromID: NextPage<Props> = (props) => {
    return (
        <Container size="xs">
            <ImageResult path={decodeURIComponent(props.path)} />
        </Container>
    )
}
ImagesFromID.getInitialProps = async ({ query, res }) => {
    if (!query.path) {
        if (!res) return { path: '' }
        res.writeHead(302, { Location: '/app' })
        res.end()
        return { path: '' }
    }
    return {
        path: query.path as string,
    }
}

export default ImagesFromID
