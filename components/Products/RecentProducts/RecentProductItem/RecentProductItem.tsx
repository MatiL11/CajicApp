import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useHandleProduct } from './useHandleProduct';
import styles from './RecentProductItemStyles';

interface RecentProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

interface RecentProductItemProps {
  product: RecentProduct;
}

const RecentProductItem: React.FC<RecentProductItemProps> = ({ product }) => {
  const { handleProductPress } = useHandleProduct(product);

  return (
    // Contenido del producto
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
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {product.seller && (
          <Text style={styles.seller} numberOfLines={1}>by {product.seller}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RecentProductItem;