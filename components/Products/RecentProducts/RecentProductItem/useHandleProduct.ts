import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/types';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

// Hook personalizado para manejar la navegación a la pantalla de detalles del producto
export const useHandleProduct = (product: Product) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Función para manejar el evento de presionar un producto
  const handleProductPress = () => {
    navigation.navigate('ProductDetail', {
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      seller: product.seller || 'Vendedor',
      description: product.description || 'Sin descripción disponible'
    });
  };

  return {
    handleProductPress
  };
};