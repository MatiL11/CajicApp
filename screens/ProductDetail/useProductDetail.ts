import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Linking } from 'react-native';

interface RouteParams {
  productId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  seller: string;
  contactNumber: string;  
}

// Hook personalizado para obtener los detalles de un producto
export const useProductDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as RouteParams;

  const handleWhatsAppContact = () => {
    // Si no hay número de WhatsApp, usamos un mensaje genérico
    const baseUrl = params.contactNumber 
      ? `https://wa.me/${params.contactNumber}`
      : 'https://wa.me/';
      
    const message = `Me interesa el producto ${params.name}`;
    const encodedMessage = encodeURIComponent(message);
    console.log(baseUrl);
    Linking.openURL(`${baseUrl}?text=${encodedMessage}`);
  };

  return {
    params,
    handleWhatsAppContact
  };
};