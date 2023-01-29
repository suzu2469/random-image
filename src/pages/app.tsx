import LoginedRoute from '@/features/LoginedRoute'
import Gacha from '@/features/Gacha'

const App = () => {
    return (
        <LoginedRoute>
            <Gacha />
        </LoginedRoute>
    )
}

export default App
