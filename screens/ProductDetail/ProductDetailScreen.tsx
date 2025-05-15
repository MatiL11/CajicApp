import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Header from '../../components/Common/Header/Header';
import { useHeader } from '../../components/Common/Header/useHeader';
import { useProductDetail } from './useProductDetail';
import styles from './ProductDetailScreenStyles';

interface RouteParams {
  productId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  seller: string;
}

const ProductDetailScreen = () => {
  const { handleBackPress } = useHeader();
  const { params, handleWhatsAppContact } = useProductDetail();

  return (
    <View style={styles.container}>
      <Header
        title="Detalle del Producto"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      
      <ScrollView>
        <Image 
          source={{ uri: params.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{params.name}</Text>
          <Text style={styles.productPrice}>${params.price}</Text>

          <View style={styles.sellerContainer}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Text style={styles.sellerInitial}>
                  {params.seller.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.sellerName}>{params.seller}</Text>
            </View>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleWhatsAppContact}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{params.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.whatsappButton}
        onPress={handleWhatsAppContact}
      >
        <Text style={styles.whatsappButtonText}>Contactar por WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailScreen;