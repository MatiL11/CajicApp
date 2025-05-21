import { useState, useEffect } from 'react';
import { auth, db, updateProfile } from '../../services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// Hook personalizado para editar el perfil del usuario
export const useEditProfile = () => {
  const currentUser = auth.currentUser;
  const [enterpriseName, setEnterpriseName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Cargar el nombre actual del usuario
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEnterpriseName(userData.enterpriseName || '');
          setContactNumber(userData.contactNumber || '');
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };

    loadUserData();
  }, [currentUser]);

  // Función para guardar los cambios en el perfil
  const handleSave = async () => {
    if (!currentUser) return false;
    if (!enterpriseName.trim()) {
      alert('El nombre no puede estar vacío');
      return false;
    }

    try {
      setIsLoading(true);
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        enterpriseName: enterpriseName.trim(),
        contactNumber: contactNumber.trim()
      });

      return true;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para subir la imagen al Storage
  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Se necesitan permisos para acceder a la galería');
        return;
      }
      // Resto del código para seleccionar la imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      // Si el usuario no canceló la selección, subir la imagen
      if (!result.canceled && result.assets[0].uri) {
        await uploadProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      alert('Error al seleccionar la imagen');
    }
  };

  // Función para subir la imagen al Storage
  const uploadProfileImage = async (uri: string) => {
    if (!currentUser) return;

    try {
      setIsLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
      
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(currentUser, {
        photoURL: downloadURL,
      });
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    enterpriseName,
    setEnterpriseName,
    contactNumber,
    setContactNumber,
    handleImagePick,
    handleSave,
    isLoading,
  };
};