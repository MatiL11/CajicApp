import { useNavigation, useRoute } from '@react-navigation/native';
import { Linking, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

interface RouteParams {
  productId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  seller: string;
  userId: string;
}

export const useProductDetail = () => {
  const route = useRoute();
  const params = route.params as RouteParams;
  const [contactNumber, setContactNumber] = useState<string>('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Primero obtenemos los detalles del producto para obtener el userId
        const productDoc = await getDoc(doc(db, 'products', params.productId));
        
        if (productDoc.exists()) {
          const productData = productDoc.data();
          const userId = productData.userId;

          // Ahora obtenemos los detalles del usuario/vendedor
          if (userId) {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setContactNumber(userData.contactNumber || '');
            }
          }
        }
      } catch (error) {
        console.error('Error al obtener detalles del producto y vendedor:', error);
      }
    };

    fetchProductDetails();
  }, [params.productId]);

  const handleWhatsAppContact = () => {
    if (!contactNumber) {
      Alert.alert(
        "Error",
        "No se encontró el número de contacto del vendedor",
        [{ text: "OK" }]
      );
      return;
    }

    const cleanNumber = contactNumber.replace(/\D/g, '');
    console.log('Número de contacto del vendedor:', cleanNumber);
    const message = `Me interesa el producto ${params.name}`;
    const encodedMessage = encodeURIComponent(message);
    const baseUrl = `https://wa.me/${cleanNumber}`;
      
    console.log('URL de WhatsApp generada:', `${baseUrl}?text=${encodedMessage}`);
    Linking.openURL(`${baseUrl}?text=${encodedMessage}`);
  };

  return {
    params,
    handleWhatsAppContact,
    contactNumber
  };
};