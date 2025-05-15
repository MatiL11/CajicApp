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
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');
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
    fetchMyProducts();
  }, []);

  // Función para manejar el botón de agregar producto
  const handleNavigateToAdd = () => {
    navigation.navigate('Add');
  };

  // Nueva función para actualizar el precio de un producto
  const handleUpdatePrice = async (productId: string, newPrice: number) => {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        price: newPrice
      });
      
      // Actualizar la lista local de productos
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId
            ? { ...product, price: newPrice }
            : product
        )
      );
      Alert.alert('Éxito', 'Precio actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el precio:', error);
      Alert.alert('Error', 'No se pudo actualizar el precio');
      throw error;
    }
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

  // Función para manejar el botón de editar precio
  const handleEditPrice = (product: Product) => {
    setEditingProductId(product.id);
    setTempPrice(product.price.toString());
  };

  // Función para manejar el botón de guardar precio
  const handleSavePrice = async (productId: string) => {
    const newPrice = parseFloat(tempPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert('Error', 'Por favor ingresa un precio válido');
      return;
    }
    try {
      await handleUpdatePrice(productId, newPrice);
      setEditingProductId(null);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el precio');
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

  return {
    products,
    loading,
    handleBackPress,
    handleNavigateToAdd,
    handleUpdatePrice,
    handleDeleteProduct,
    editingProductId,
    tempPrice,
    setTempPrice,
    handleEditPrice,
    handleSavePrice,
    handleDelete,
    setEditingProductId
  };
};