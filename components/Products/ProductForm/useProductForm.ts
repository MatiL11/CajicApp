import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

interface UseProductFormResult {
  name: string;
  description: string;
  price: string;
  category: string;
  image: any | null;
  uploading: boolean;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setPrice: (value: string) => void;
  setCategory: (value: string) => void;
  handleSelectImage: () => Promise<void>;
  handleSubmit: () => void;
  categories: Array<{ id: string; name: string; icon: string }>
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  image: any | null;
}

const categories = [
  { id: '1', name: 'Electrónicos', icon: 'devices' },
  { id: '2', name: 'Ropa', icon: 'checkroom' },
  { id: '3', name: 'Hogar', icon: 'home' },
  { id: '4', name: 'Alimentos', icon: 'fastfood' },
  { id: '5', name: 'Cocina', icon: 'restaurant' },
  { id: '6', name: 'Mascotas', icon: 'pets' },
];

// Hook personalizado para el formulario de producto
export const useProductForm = (
  onSubmit: (productData: ProductData) => void,
  initialData?: ProductData
) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [category, setCategory] = useState(() => {
    if (!initialData?.category) return '';
    // Buscar el ID de la categoría basado en el nombre
    const categoryFound = categories.find(cat => cat.name === initialData.category);
    return categoryFound ? categoryFound.id : '';
  });
  const [image, setImage] = useState(initialData?.image || null);
  const [uploading, setUploading] = useState(false);

  // Función para seleccionar una imagen desde la galería
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permiso necesario', 'Necesitamos permiso para acceder a tu galería de fotos.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Si se seleccionó una imagen, actualizamos el estado
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    onSubmit({ 
      name, 
      description, 
      price, 
      category: categories.find(cat => cat.id === category)?.name || '', 
      image 
    });
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage(null);
  };

  // Devolvemos los valores y funciones necesarios para el formulario
  return {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    category,
    setCategory,
    image,
    uploading,
    handleSelectImage,
    handleSubmit,
    categories, 
  };
};