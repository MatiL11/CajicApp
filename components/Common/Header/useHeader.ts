import { useNavigation } from '@react-navigation/native';

// Hook personalizado para manejar el encabezado
export const useHeader = () => {
  const navigation = useNavigation();

  // Función para manejar el botón de retroceso
  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    handleBackPress,
  };
};