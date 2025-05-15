import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from './HeaderStyles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const Header = ({ 
  title, 
  showBackButton = true, 
  onBackPress,
  rightComponent 
}: HeaderProps) => {
  return (
    // Componente de encabezado 
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {rightComponent || <View style={styles.placeholder} />}
    </View>
  );
};

export default Header;