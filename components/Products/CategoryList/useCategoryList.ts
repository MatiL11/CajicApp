import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types';

export interface Category {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

// Hook personalizado para obtener la lista de categorías
export const useCategoryList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [categories] = useState<Category[]>([
    {
      name: 'Electrónicos',
      icon: 'devices'
    },
    {
      name: 'Ropa',
      icon: 'checkroom'
    },
    {
      name: 'Hogar',
      icon: 'home'
    },
    {
      name: 'Alimentos',
      icon: 'fastfood'
    },
    {
      name: 'Cocina',
      icon: 'restaurant'
    },
    {
      name: 'Mascotas',
      icon: 'pets'
    }
  ]);

  // Función para manejar la selección de una categoría
  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('CategoryProducts', {
      categoryName: categoryName
    });
  };

  return {
    categories,
    handleCategoryPress
  };
};