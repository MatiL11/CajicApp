import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../../services/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  image: any | null;
}

// Hook personalizado para crear un producto
export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storage = getStorage();

  // Función para crear un producto
  const handleCreateProduct = async (productData: ProductData) => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión para crear un producto');
      return false;
    }

    // Validar que todos los campos obligatorios estén completos
    if (!productData.name || !productData.price || !productData.category) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return false;
    }

    setIsLoading(true);
    try {
      let imageUrl = null;

      // Si hay una imagen, subirla primero a Storage
      if (productData.image) {
        const imageRef = ref(storage, `products/${Date.now()}-${productData.name}`);
        const response = await fetch(productData.image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Crear el documento en Firestore
      const productRef = collection(db, 'products');
      await addDoc(productRef, {
        name: productData.name,
        description: productData.description || '',
        price: parseFloat(productData.price),
        category: productData.category,
        imageUrl,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      Alert.alert('¡Éxito!', 'Producto creado correctamente');
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el producto. Por favor intenta de nuevo.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateProduct,
    isLoading
  };
};