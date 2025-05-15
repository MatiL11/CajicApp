import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSearchHeader } from './useSearchHeader';
import styles from './SearchHeaderStyles';

interface SearchHeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

const SearchHeader = ({ 
  title, 
  searchQuery, 
  onSearchChange, 
  placeholder = "Buscar productos..." 
}: SearchHeaderProps) => {
  const { handleBackPress, handleSearchChange } = useSearchHeader({
    searchQuery,
    onSearchChange
  });

  return (
    /* Contenedor del encabezado */
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity 
          onPress={handleBackPress}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
    </View>
  );
};

export default SearchHeader;