import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from './ProfileScreenStyles';
import Header from '../../components/Common/Header/Header';
import { useBottomNavBar } from '../../components/BottomNavBar/useCheckRole';
import { useProfileScreen } from './useProfileScreen';

const ProfileScreen = () => {
  const {
    currentUser,
    userData,
    handleBackPress,
    handleNavigateToMyProducts,
    handleNavigateToEditProfile,
    handleLogout
  } = useProfileScreen();
  const { isVendedor } = useBottomNavBar();

  return (
    <View style={styles.container}>
      <Header 
        title="Perfil"
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.profileInfo}>
        <Image 
          source={{ 
            uri: currentUser?.photoURL || 'https://via.placeholder.com/100'
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {userData?.enterpriseName || 'Empresa'}
        </Text>
        <Text style={styles.userEmail}>
          {currentUser?.email || 'correo@ejemplo.com'}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
      {isVendedor && (
        <TouchableOpacity 
          style={styles.optionItem}
          onPress={handleNavigateToMyProducts}
        >
          <MaterialIcons name="shopping-bag" size={24} color="#5F4DEE" />
          <Text style={styles.optionText}>Mis Productos</Text>
          <MaterialIcons name="chevron-right" size={24} color="#9d9d9d" />
        </TouchableOpacity>
      )}
        <TouchableOpacity 
          style={styles.optionItem}
          onPress={handleNavigateToEditProfile}
        >
          <MaterialIcons name="person" size={24} color="#5F4DEE" />
          <Text style={styles.optionText}>Editar Perfil</Text>
          <MaterialIcons name="chevron-right" size={24} color="#9d9d9d" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionItem}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#FF4B4B" />
          <Text style={styles.optionTextRed}>Cerrar Sesión</Text>
          <MaterialIcons name="chevron-right" size={24} color="#9d9d9d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;