import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { Provider as UserProvider } from '@/context/user'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </MantineProvider>
    )
}
