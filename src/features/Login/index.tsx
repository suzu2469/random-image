import {
    Button,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'

type FormData = {
    email: string
    password: string
}
const Login = () => {
    const router = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(
            z.object({
                email: z
                    .string()
                    .email('正しいメールアドレスを入力してください'),
                password: z.string().min(12, '12文字以上で入力してください'),
            }),
        ),
        reValidateMode: 'onBlur',
    })

    return (
        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" weight={600}>
                Login
            </Text>

            <form
                onSubmit={form.handleSubmit((data) => {
                    signInWithEmailAndPassword(auth, data.email, data.password)
                        .then(() => {
                            router.push('/app')
                        })
                        .catch(() => {
                            throw new Error('ログインに失敗しました')
                        })
                })}
            >
                <Stack mt="xl">
                    <TextInput
                        required
                        label="Email"
                        {...form.register('email')}
                    />
                    <PasswordInput
                        required
                        label="Password"
                        {...form.register('password')}
                    />
                    <Button type="submit" mt="xl" fullWidth>
                        ログイン
                    </Button>
                </Stack>
            </form>
        </Paper>
    )
}

export default Login
