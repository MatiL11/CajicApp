import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
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
    editingProductId,
    tempPrice,
    setTempPrice,
    handleEditPrice,
    handleSavePrice,
    handleDelete,
    setEditingProductId
  } = useMyProductsScreen();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {editingProductId === item.id ? (
          <View style={styles.priceEditContainer}>
            <TextInput
              style={styles.priceInput}
              value={tempPrice}
              onChangeText={setTempPrice}
              keyboardType="numeric"
              placeholder="Nuevo precio"
              autoFocus
            />
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => handleSavePrice(item.id)}
            >
              <MaterialIcons name="check" size={24} color="#5F4DEE" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setEditingProductId(null)}
            >
              <MaterialIcons name="close" size={24} color="#FF4B4B" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.productPrice}>${item.price}</Text>
        )}
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditPrice(item)}
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