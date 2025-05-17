import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useCategoryList } from './useCategoryList';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from './CategoryListStyles';

const CategoryList = () => {
  const { categories, handleCategoryPress } = useCategoryList();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((item) => (
          <TouchableOpacity 
            key={item.name}
            onPress={() => handleCategoryPress(item.name)} 
            style={styles.categoryItem}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name={item.icon} size={24} color="#5F4DEE" />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;