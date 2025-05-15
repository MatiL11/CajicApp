import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';

export interface RecentProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

export const useRecentProductList = () => {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener la lista de productos recientes
  const fetchRecentProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('createdAt', 'desc'),
        limit(4)
      );
      
      // Obtener los documentos de los productos
      const querySnapshot = await getDocs(q);
      const productsPromises = querySnapshot.docs.map(async docSnapshot => {
        const productData = docSnapshot.data();
        const userDocRef = doc(db, 'users', productData.userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // Crear el objeto de producto
        return {
          id: docSnapshot.id,
          name: productData.name,
          price: productData.price,
          imageUrl: productData.imageUrl || 'https://via.placeholder.com/200',
          seller: userData?.enterpriseName || 'Vendedor',
          description: productData.description || 'Sin descripción disponible',
          contactNumber: userData?.contactNumber || '' 
        };
      });

      // Esperar a que se resuelvan todas las promesas
      const products = await Promise.all(productsPromises);
      setRecentProducts(products);
    } catch (error) {
      console.error('Error al obtener productos recientes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener la lista de productos recientes al cargar el componente y cada 30 segundos
  useEffect(() => {
    fetchRecentProducts();
    const interval = setInterval(fetchRecentProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Devolver la lista de productos recientes y el estado de carga
  return {
    recentProducts,
    loading,
    refreshProducts: fetchRecentProducts
  };
};

export default useRecentProductList;