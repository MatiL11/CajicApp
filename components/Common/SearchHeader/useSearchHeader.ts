import { useNavigation } from '@react-navigation/native';

interface UseSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

// Hook personalizado para manejar la lógica del encabezado de búsqueda
export const useSearchHeader = ({ searchQuery, onSearchChange }: UseSearchHeaderProps) => {
  const navigation = useNavigation();

  // Función para manejar el evento de presionar el botón de retroceso
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Función para manejar el cambio en el texto de búsqueda
  const handleSearchChange = (text: string) => {
    onSearchChange(text);
  };

  return {
    searchQuery,
    handleBackPress,
    handleSearchChange
  };
};