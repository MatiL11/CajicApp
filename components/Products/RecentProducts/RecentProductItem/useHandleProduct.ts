import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../services/firebaseConfig';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
  userId?: string;
}

export const useHandleProduct = (product: Product) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleProductPress = async () => {
    let contactNumber = '';
    
    if (product.userId) {
      try {
        const userDoc = await getDoc(doc(db, 'users', product.userId));
        if (userDoc.exists()) {
          contactNumber = userDoc.data().phoneNumber || '';
        }
      } catch (error) {
        console.error('Error al obtener el número de contacto:', error);
      }
    }

    navigation.navigate('ProductDetail', {
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      seller: product.seller || 'Vendedor',
      description: product.description || 'Sin descripción disponible',
      contactNumber: contactNumber
    });
  };

  return {
    handleProductPress
  };
};