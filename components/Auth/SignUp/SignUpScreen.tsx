import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from './SignUpStyles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/types';
import useSignUp from './useSignUp'; 

const SignUpScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    enterpriseName,
    setEnterpriseName,
    contactNumber,
    setContactNumber,
    error,
    loading,
    handleSignUp,
    success,
  } = useSignUp();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [accountType, setAccountType] = useState<'vendedor' | 'comprador'>('comprador');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

  useEffect(() => {
    if (success) {
      // Espera un momento para mostrar el mensaje de éxito antes de navegar
      const timeout = setTimeout(() => {
        navigation.navigate('SignIn');
      }, 1500); // 1.5 segundos
      setAccountType('comprador');
      setIsPasswordVisible(false);
      return () => clearTimeout(timeout);
    }
  }, [success, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      enabled
    >
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.header}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Ingresa a CajicApp</Text>
        <Text style={styles.description}>Crea una cuenta para mostrar tus productos</Text>

        {/* Campos de entrada */}
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre completo"
          value={enterpriseName}
          onChangeText={setEnterpriseName}
        />

        <Text style={styles.label}>Número de contacto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu número de contacto"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Crea una contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={22}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordHint}>Al menos 8 caracteres</Text>

        <Text style={styles.label}>Tipo de Cuenta</Text>
        <View style={styles.accountTypeContainer}>
          <TouchableOpacity
            style={[
              styles.accountTypeButton,
              accountType === 'comprador' && styles.accountTypeButtonActive
            ]}
            onPress={() => setAccountType('comprador')}
          >
            <MaterialIcons name="shopping-cart" size={20} color={accountType === 'comprador' ? "#5F4DEE" : "#9d9d9d"} />
            <Text style={[
              styles.accountTypeText,
              accountType === 'comprador' && styles.accountTypeTextActive
            ]}>Comprador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.accountTypeButton,
              accountType === 'vendedor' && styles.accountTypeButtonActive
            ]}
            onPress={() => setAccountType('vendedor')}
          >
            <MaterialIcons name="insert-chart" size={20} color={accountType === 'vendedor' ? "#5F4DEE" : "#9d9d9d"} />
            <Text style={[
              styles.accountTypeText,
              accountType === 'vendedor' && styles.accountTypeTextActive
            ]}>Vendedor</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => handleSignUp(accountType)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createAccountButtonText}>Crear Cuenta</Text>
          )}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green', textAlign: 'center', marginVertical: 8 }}>¡Cuenta creada con éxito!</Text> : null}

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginLink}>Ingresa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;