import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useHeader } from '../../components/Common/Header/useHeader';
import { Alert } from 'react-native';

// Hook personalizado para la pantalla de perfil
export const useProfileScreen = () => {
  const { handleBackPress } = useHeader();
  const currentUser = auth.currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<any>(null);
  const [isVendedor, setIsVendedor] = useState(false);

  // Obtener datos del usuario al entrar en la pantalla
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        }
      };

      fetchUserData();
    }, [currentUser])
  );

  // Navegar a la pantalla de productos del usuario
  const handleNavigateToMyProducts = () => {
    navigation.navigate('MyProducts');
  };

  // Navegar a la pantalla de edición de perfil
  const handleNavigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  // Cerrar sesión del usuario
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cerrar sesión",
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }]
              });
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta nuevamente.');
            }
          }
        }
      ]
    );
  };

  // Verificar el rol del usuario al cargar la pantalla
  useEffect(() => {
    const checkUserRole = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setIsVendedor(userDoc.data().role === 'vendedor');
          }
        } catch (error) {
          console.error('Error al verificar el rol del usuario:', error);
        }
      }
    };

    checkUserRole();
  }, []);

  return {
    currentUser,
    userData,
    handleBackPress,
    handleNavigateToMyProducts,
    handleNavigateToEditProfile,
    handleLogout
  };
};