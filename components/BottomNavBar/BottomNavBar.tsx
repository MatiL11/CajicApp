import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useBottomNavBar } from './useCheckRole';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from './BottomNavBarStyles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const BottomNavBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isVendedor } = useBottomNavBar();
  return (
    // inicio
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="home" size={24} color="#5F4DEE" />
        <Text style={styles.activeTabText}>Inicio</Text>
      </TouchableOpacity>
      {/* explorar */}
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Explore')}>
        <MaterialIcons name="explore" size={24} color="#9d9d9d" />
        <Text style={styles.tabText}>Explorar</Text>
      </TouchableOpacity>
      {/* vender */}
      {isVendedor && (
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Add')}>
          <MaterialIcons name="add-circle-outline" size={24} color="#9d9d9d" />
          <Text style={styles.tabText}>Vender</Text>
        </TouchableOpacity>
      )}
      {/* perfil */}
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
        <MaterialIcons name="person" size={24} color="#9d9d9d" />
        <Text style={styles.tabText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;