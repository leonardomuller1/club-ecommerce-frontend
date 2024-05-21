import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDMGHez5hfHsojIwRseBFHEqyOYPfFer00',
  authDomain: 'club-ecommerce-704d5.firebaseapp.com',
  projectId: 'club-ecommerce-704d5',
  storageBucket: 'club-ecommerce-704d5.appspot.com',
  messagingSenderId: '469471273598',
  appId: '1:469471273598:web:0edd5258bffd2a92f82e2f'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
