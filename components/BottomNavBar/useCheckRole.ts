import { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const useBottomNavBar = () => {
  const [isVendedor, setIsVendedor] = useState(false);

  // Verificar el rol del usuario al cargar la aplicación
  useEffect(() => {
    const checkUserRole = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setIsVendedor(userDoc.data().accountType === 'vendedor');
          }
        } catch (error) {
          console.error('Error al verificar el rol del usuario:', error);
        }
      }
    };

    checkUserRole();
  }, []);

  return {
    isVendedor,
  };
};