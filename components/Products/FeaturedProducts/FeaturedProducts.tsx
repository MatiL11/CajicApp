import React from 'react';
import { View, Text, FlatList } from 'react-native';
import FeaturedProductItem from './FeaturedProductItem/FeaturedProductItem';
import styles from './FeaturedProductsStyles';
import useFeaturedProducts from './useFeaturedProducts';


const FeaturedProducts = () => {
  const { featuredProducts, loading } = useFeaturedProducts();
  return (
    // Contenido de la pantalla de productos destacados
    <View style={styles.container}>
      <Text style={styles.title}>Productos Destacados</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando productos...</Text>
      ) : (
        <View style={styles.productContainer}>
          <FlatList
            data={featuredProducts}
            renderItem={({ item }) => <FeaturedProductItem product={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </View>
  );
};

export default FeaturedProducts;