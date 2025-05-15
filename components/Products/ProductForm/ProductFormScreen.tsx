import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductForm } from './useProductForm';
import styles from './ProductFormStyles';

interface ProductFormScreenProps {
  onSubmit: (productData: {
    name: string;
    description: string;
    price: string;
    category: string;
    image: any | null;
  }) => void;
}

const ProductFormScreen: React.FC<ProductFormScreenProps> = ({ onSubmit }) => {
  const {
    name,
    description,
    price,
    category,
    image,
    uploading,
    setName,
    setDescription,
    setPrice,
    setCategory,
    handleSelectImage,
    handleSubmit,
    categories
  } = useProductForm(onSubmit);

  return (
    <ScrollView style={styles.container}>
      {/* Sección de Carga de Imagen */}
      <TouchableOpacity style={styles.uploadContainer} onPress={handleSelectImage}>
        {image ? (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: image }} 
              style={styles.imagePreview}
              resizeMode="cover"
            />
            <View style={styles.editOverlay}>
              <MaterialIcons name="edit" size={24} color="#FFF" />
            </View>
          </View>
        ) : (
          <>
            <MaterialIcons name="file-upload" size={24} color="#5F4DEE" />
            <Text style={styles.uploadTitle}>Subir Imágenes del Producto</Text>
            <Text style={styles.uploadSubtitle}>Toca para seleccionar imágenes (máx. 5)</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Detalles del Producto */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Producto *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingresa el nombre del producto"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Precio *</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.priceInput}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Text style={styles.label}>Categoría *</Text>
          <View style={styles.categoriesRow}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && styles.categoryButtonSelected
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <MaterialIcons 
                  name={cat.icon as keyof typeof MaterialIcons.glyphMap}
                  size={24} 
                  color={category === cat.id ? "#5F4DEE" : "#666"} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  category === cat.id && styles.categoryButtonTextSelected
                ]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe tu producto..."
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />
      </View>

      {/* Botón de Publicar */}
      <TouchableOpacity 
        style={styles.publishButton} 
        onPress={handleSubmit}
        disabled={uploading}
      >
        <Text style={styles.publishButtonText}>
          {uploading ? 'Publicando...' : 'Publicar Producto'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductFormScreen;