import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from '../../services/firebaseConfig';
import styles from './EditProfileStyles';
import Header from '../../components/Common/Header/Header';
import { useHeader } from '../../components/Common/Header/useHeader';
import { useEditProfile } from './useEditProfile';

const EditProfileScreen = () => {
  const { handleBackPress } = useHeader();
  const { 
    enterpriseName, 
    setEnterpriseName, 
    handleImagePick, 
    handleSave,
    isLoading 
  } = useEditProfile();
  const currentUser = auth.currentUser;

  const onSave = async () => {
    const success = await handleSave();
    if (success) {
      handleBackPress();
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Editar Perfil"
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.imageContainer} 
          onPress={handleImagePick}
          disabled={isLoading}
        >
          <Image 
            source={{ 
              uri: currentUser?.photoURL || 'https://via.placeholder.com/100'
            }}
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={enterpriseName}
            onChangeText={setEnterpriseName}
            placeholder="Ingresa el nombre que deseas mostrar"
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={onSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;