import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { Provider as UserProvider } from '@/context/user'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider withNormalizeCSS withGlobalStyles>
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}
