import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useHandleProduct } from '../../RecentProducts/RecentProductItem/useHandleProduct';
import styles from './FeaturedProductItemStyles';

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

interface FeaturedProductItemProps {
  product: FeaturedProduct;
}

const FeaturedProductItem: React.FC<FeaturedProductItemProps> = ({ product }) => {
  const { handleProductPress } = useHandleProduct(product);

  return (
    // Contenedor principal del producto
    <TouchableOpacity 
      style={styles.container}
      onPress={handleProductPress}
    >
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedProductItem;