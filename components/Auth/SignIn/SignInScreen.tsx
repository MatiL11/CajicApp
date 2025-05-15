import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/types';
import { loginAndRedirect } from '../SignIn/authNavigationHandler';
import styles from './SignInStyles';
import useSignIn from './useSignIn';

const SignInScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSignIn,
  } = useSignIn();
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>CA</Text>
        </View>
      </View>
      {/* Título y descripción */}
      <Text style={styles.header}>CajicApp</Text>
      <Text style={styles.description}>¡Descubre y muestra productos increíbles!</Text>

      {/* Email */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Ingresa tu contraseña"
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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón Log In */}
      <TouchableOpacity
      style={styles.loginButton}
      onPress={() => loginAndRedirect(handleSignIn, navigation)}
      disabled={loading}
      >
        <Text style={styles.loginButtonText}>{loading ? 'Cargando...' : 'Iniciar sesión'}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Separador OR */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>O</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Sign Up */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;