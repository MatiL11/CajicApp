import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useHandleProduct } from '../RecentProducts/RecentProductItem/useHandleProduct';
import styles from './ProductCardStyles';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleProductPress } = useHandleProduct(product);

  return (
    // Carta de producto
    <TouchableOpacity 
      style={styles.container}
      onPress={handleProductPress}
    >
      {/* Imagen del producto */}
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      {/* Información del producto */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {product.seller && (
          <Text style={styles.seller} numberOfLines={1}>by {product.seller}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;