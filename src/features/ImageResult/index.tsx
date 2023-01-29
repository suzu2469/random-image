import { Image, Loader } from '@mantine/core'
import React from 'react'
import { useQuery } from 'react-query'
import { getDownloadURL, ref } from '@firebase/storage'
import { cloudStorage } from '@/lib/firebase'

type Props = {
    path: string
}
const ImageResult: React.FC<Props> = (props) => {
    const query = useQuery(`images/${props.path}`, async () => {
        console.log(props.path)
        const reference = ref(cloudStorage, props.path)
        return await getDownloadURL(reference)
    })

    if (query.isLoading) return <Loader />
    return <Image src={query.data} />
}

export default ImageResult
