import { useQuery } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { firestore } from '@/lib/firebase'
import type { FirestoreImageCollection } from '@/lib/types/FirestoreImageCollection'
import { Button, Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { IconUpload } from '@tabler/icons-react'
import Link from 'next/link'

const Gacha = () => {
    const router = useRouter()
    const { data: images } = useQuery('images', async () => {
        const docs = await getDocs(collection(firestore, 'images'))
        let data: FirestoreImageCollection[] = []
        docs.forEach((doc) => {
            data.push(doc.data() as any)
        })
        return data
    })

    const lottery = () => {
        if (!images) return
        const lot =
            window.crypto.getRandomValues(new Uint32Array(1))[0] % images.length
        const imageRef = images[lot]
        if (!imageRef) return
        router.push(`/images?path=${encodeURIComponent(imageRef.url)}`)
    }

    return (
        <Flex
            align="center"
            justify="center"
            direction="column"
            style={{ height: '100vh' }}
        >
            <Button onClick={lottery} size="xl">
                ランダムな画像を見る
            </Button>
            <Link href="/create">
                <Button mt="sm" variant="subtle" leftIcon={<IconUpload />}>
                    画像をアップロードする
                </Button>
            </Link>
            <Link href="/logout">
                <Button mt="sm" variant="subtle" compact color="gray">
                    ログアウト
                </Button>
            </Link>
        </Flex>
    )
}

export default Gacha
