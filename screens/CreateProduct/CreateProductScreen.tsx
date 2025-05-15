import React from 'react';
import { View } from 'react-native';
import styles from './CreateProductScreenStyles';
import Header from '../../components/Common/Header/Header';
import ProductFormScreen from '../../components/Products/ProductForm/ProductFormScreen';
import { useHeader } from '../../components/Common/Header/useHeader';
import { useCreateProduct } from './useCreateProduct';
import { useNavigation } from '@react-navigation/native';

const CreateProductScreen = () => {
  const { handleBackPress } = useHeader();
  const { handleCreateProduct, isLoading } = useCreateProduct();
  const navigation = useNavigation();

  // Maneja el envío del formulario
  const handleSubmit = async (productData: {
    name: string;
    description: string;
    price: string;
    category: string;
    image: any | null;
  }) => {
    const success = await handleCreateProduct(productData);
    if (success) {
      navigation.goBack();
    }
  };

  // Renderiza el componente de formulario
  return (
    <View style={styles.container}>
      <Header 
        title="Agregar Nuevo Producto"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      <ProductFormScreen onSubmit={handleSubmit} />
    </View>
  );
};

export default CreateProductScreen;