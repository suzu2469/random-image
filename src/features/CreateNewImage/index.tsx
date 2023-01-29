import { Button, FileInput, Image, Paper, Stack, Text } from '@mantine/core'
import { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { cloudStorage, firestore } from '@/lib/firebase'
import { addDoc, collection } from '@firebase/firestore'
import type { FirestoreImageCollection } from '@/lib/types/FirestoreImageCollection'
import { userContext } from '@/context/user'
import { ref, uploadBytes } from '@firebase/storage'
import { useRouter } from 'next/router'

const CreateNewImage = () => {
    const router = useRouter()
    const user = useContext(userContext)
    const [image, setImage] = useState<File | null>(null)
    const mutation = useMutation('createImage', async (file: File) => {
        const imageRef = ref(
            cloudStorage,
            `images/${window.crypto.randomUUID()}`,
        )
        const imageSnapshot = await uploadBytes(imageRef, file)
        await addDoc(collection(firestore, 'images'), {
            url: imageSnapshot.ref.fullPath,
            user: user.user?.uid ?? '',
        } as FirestoreImageCollection)
    })

    return (
        <Paper withBorder p="xl">
            <Stack>
                <Text size="xl" weight="600">
                    画像をアップロード
                </Text>
                {image && (
                    <Image src={window.URL.createObjectURL(image)}></Image>
                )}
                <FileInput
                    label="ここから画像をアップロード"
                    accept="image/*"
                    onChange={(e) => setImage(e)}
                />
                <Button
                    fullWidth
                    disabled={image === null}
                    onClick={() => {
                        mutation
                            .mutateAsync(image as File)
                            .then(() => {
                                router.push('/app')
                            })
                            .catch((e) => {
                                console.error(e)
                                throw new Error(
                                    'ファイルのアップロードに失敗しました',
                                )
                            })
                    }}
                >
                    送信
                </Button>
            </Stack>
        </Paper>
    )
}

export default CreateNewImage