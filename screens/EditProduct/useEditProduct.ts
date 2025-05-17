import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { Alert } from 'react-native';

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string | null;
}

export const useEditProduct = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as RootStackParamList['EditProduct'];
  const [initialProductData, setInitialProductData] = useState<ProductData>({
    name: params.name,
    description: params.description,
    price: params.price.toString(),
    category: params.category,
    image: params.imageUrl
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async (productData: ProductData) => {
    try {
      const productRef = doc(db, 'products', params.productId);
      await updateDoc(productRef, {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        imageUrl: productData.image
      });

      Alert.alert(
        'Éxito',
        'Producto actualizado correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MyProducts', { refresh: true });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    }
  };

  return {
    handleSubmit,
    handleBackPress,
    initialProductData
  };
};