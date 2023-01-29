import { initializeApp } from '@firebase/app'
import {
    ActionCodeSettings,
    getAuth,
    setPersistence,
    indexedDBLocalPersistence,
} from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyA5lW37KeIu3ezw_eES7DkGvGmBThgeu4w',
    authDomain: 'random-image-c6e80.firebaseapp.com',
    projectId: 'random-image-c6e80',
    storageBucket: 'random-image-c6e80.appspot.com',
    messagingSenderId: '409269866204',
    appId: '1:409269866204:web:d71188d94e76095349ee19',
}

export const actionCodeSettings: ActionCodeSettings = {
    url: 'http://localhost:3000/signin',
    handleCodeInApp: true,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
setPersistence(auth, indexedDBLocalPersistence)

export const firestore = getFirestore(app)

export const cloudStorage = getStorage(app)

export default app
