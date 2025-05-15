# CajicApp

CajicApp es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios explorar y gestionar productos, así como mantener perfiles de usuario.

## Requisitos Previos

- Node.js (versión recomendada: 18 o superior)
- npm o yarn
- Expo CLI
- Un dispositivo móvil con Expo Go instalado o un emulador

## Configuración del Proyecto

1. **Instalar Dependencias**
   ```bash
   cd CajicApp
   npm install
2. **Configurar Firebase**
   Crea un proyecto en Firebase Console.
   Obtener las credenciales de Firebase (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
   Actualiza el archivo services/firebaseConfig.js con tus credenciales.
3. **Ejecutar la Aplicación**
   ```bash
   npm start
4. **Escanear el Código QR con Expo Go**
    Abre la aplicación Expo Go en tu dispositivo móvil.
    Escanea el código QR que aparece en la terminal después de ejecutar npm start.
    O presiona 'a' para abrirlo en el emulador.

## Caracteristicas principales
- **Autenticacion de usuarios:**
  - Registro de usuarios
  - Inicio de sesión de usuarios
  - Cierre de sesión de usuarios
  - Gestion de perfiles de usuario

  - **Gestion de productos:**
    - Listado de productos
    - Detalle de productos
    - Crear nuevos productos (solo vendedores)
    - Editar productos (solo vendedores)
    - Eliminar productos (solo vendedores)

  - **Perfiles de usuario:**
    - Ver perfil de usuario
    - Editar perfil de usuario
    - Gestionar productos (solo vendedores)

## Scripts disponibles
  - npm start
  - npm run ios
  - npm run android
  - npm run web

## Tecnologias utilizadas
  - React Native
  - Expo
  - Firebase
  - Typescript
  - React Navigation

## Notas adicionales
  - La aplicación requiere una conexión a internet para funcionar correctamente
  - Se recomienda tener la última versión de Expo Go instalada
  - Para pruebas en iOS, se necesita un dispositivo Apple o macOS con Xcode instalado

  