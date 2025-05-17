import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { auth, db } from '../../services/firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useHeader } from '../../components/Common/Header/useHeader';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

// Hook personalizado para obtener la lista de productos del usuario
export const useMyProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { handleBackPress } = useHeader();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Función para obtener la lista de productos del usuario
  const fetchMyProducts = async () => {
    if (!auth.currentUser) return;

    // Obtener la lista de productos del usuario
    try {
      const q = query(
        collection(db, 'products'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(productsData);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyProducts();
    });

    return unsubscribe;
  }, [navigation]);

  // Función para manejar el botón de agregar producto
  const handleNavigateToAdd = () => {
    navigation.navigate('Add');
  };

  // Nueva función para eliminar un producto
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      
      // Actualizar la lista local de productos
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
      Alert.alert('Éxito', 'Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Alert.alert('Error', 'No se pudo eliminar el producto');
      throw error;
    }
  };


  // Función para manejar el botón de eliminar producto
  const handleDelete = (productId: string) => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => handleDeleteProduct(productId)
        }
      ]
    );
  };

  // Función para navegar a la pantalla de edición
  const handleNavigateToEdit = (product: Product) => {
    navigation.navigate('EditProduct', {
      productId: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl
    });
  };

  return {
    products,
    loading,
    handleBackPress,
    handleNavigateToAdd,
    handleNavigateToEdit, // Agregamos la nueva función al return
    handleDelete,
    // Removemos las funciones relacionadas con la edición in-situ
  };
};