// services/firebaseConfig.ts

import { initializeApp } from '@firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "Aqui van sus datos",
  authDomain: "Aqui van sus datos",
  databaseURL: "Aqui van sus datos",
  projectId: "Aqui van sus datos",
  storageBucket: "Aqui van sus datos",
  messagingSenderId: "Aqui van sus datos",
  appId: "Aqui van sus datos"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // persistencia temporal (solo mientras la app está abierta)
const db = getFirestore(app);


export { auth, updateProfile, db };
