import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Common/Header/Header';
import styles from './MyProductsScreenStyles';
import { useMyProductsScreen } from './useMyProductsScreen';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

const MyProductsScreen = () => {
  const { 
    products, 
    loading, 
    handleBackPress, 
    handleNavigateToAdd,
    handleNavigateToEdit,
    handleDelete
  } = useMyProductsScreen();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleNavigateToEdit(item)}
        >
          <MaterialIcons name="edit" size={24} color="#5F4DEE" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <MaterialIcons name="delete" size={24} color="#FF4B4B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Mis Productos"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#5F4DEE" style={styles.loader} />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="shopping-bag" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No tienes productos publicados</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleNavigateToAdd}
          >
            <Text style={styles.addButtonText}>Agregar Producto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MyProductsScreen;