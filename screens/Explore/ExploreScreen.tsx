import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './ExploreScreenStyles';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import SearchHeader from '../../components/Common/SearchHeader/SearchHeader';
import { useExploreScreen } from './useExploreScreen';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

const ExploreScreen = () => {
  const { searchQuery, setSearchQuery, products, loading } = useExploreScreen();

  return (
    <View style={styles.container}>
      <SearchHeader
        title="Explorar"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FlatList<Product>
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        numColumns={2}
        keyExtractor={(item: Product) => item.id}
        contentContainerStyle={styles.productGrid}
      />
    </View>
  );
};

export default ExploreScreen;