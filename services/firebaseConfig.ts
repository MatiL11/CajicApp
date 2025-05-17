// services/firebaseConfig.ts

import { initializeApp, getApps, getApp } from '@firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AQUI VAN TUS DATOS",
  authDomain: "AQUI VAN TUS DATOS",
  databaseURL: "AQUI VAN TUS DATOS",
  projectId: "AQUI VAN TUS DATOS",
  storageBucket: "AQUI VAN TUS DATOS",
  messagingSenderId: "AQUI VAN TUS DATOS",
  appId: "AQUI VAN TUS DATOS",
};

// Inicializa Firebase solo si no hay una instancia existente
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, updateProfile, db };
