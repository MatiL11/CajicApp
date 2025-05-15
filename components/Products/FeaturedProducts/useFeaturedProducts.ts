import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

// Hook personalizado para obtener productos destacados
export const useFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener productos destacados
  const fetchFeaturedProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      
      const querySnapshot = await getDocs(q);
      const productsPromises = querySnapshot.docs.map(async docSnapshot => {
        const productData = docSnapshot.data();
        const userDocRef = doc(db, 'users', productData.userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // Verificar si el campo 'imageUrl' existe en productData
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

      // Esperar a que todas las promesas se resuelvan
      const products = await Promise.all(productsPromises);
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para obtener productos destacados al cargar el componente
  useEffect(() => {
    fetchFeaturedProducts();
    const interval = setInterval(fetchFeaturedProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    featuredProducts,
    loading,
    refreshProducts: fetchFeaturedProducts
  };
};

export default useFeaturedProducts;