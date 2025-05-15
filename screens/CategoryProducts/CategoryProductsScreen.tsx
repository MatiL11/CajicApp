import React from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Header from '../../components/Common/Header/Header';
import { useHeader } from '../../components/Common/Header/useHeader';
import { useCategoryProducts } from './useCategoryProducts';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import styles from './CategoryProductsScreenStyles';

type CategoryProductsRouteProp = RouteProp<{
  CategoryProducts: {
    categoryName: string;
  };
}, 'CategoryProducts'>;

// Interfaz para definir la estructura de un producto
const CategoryProductsScreen = () => {
  const route = useRoute<CategoryProductsRouteProp>();
  const { handleBackPress } = useHeader();
  const { products, loading } = useCategoryProducts(route.params.categoryName);

  return (
    <View style={styles.container}>
      <Header
        title={`${route.params.categoryName}`}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default CategoryProductsScreen;