import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../components/Common/Header/Header';
import ProductForm from '../../components/Products/ProductForm/ProductFormScreen';
import { useEditProduct } from './useEditProduct';
import styles from './EditProductStyles';

const EditProductScreen = () => {
  const { handleSubmit, handleBackPress, initialProductData } = useEditProduct();

  return (
    <View style={styles.container}>
      <Header 
        title="Editar Producto"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      <ScrollView>
        <ProductForm 
          onSubmit={handleSubmit}
          initialData={initialProductData}
        />
      </ScrollView>
    </View>
  );
};

export default EditProductScreen;