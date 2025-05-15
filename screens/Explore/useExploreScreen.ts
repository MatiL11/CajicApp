import { useState, useEffect, useMemo } from 'react';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  description: string;
}

// Hook personalizado para obtener la lista de productos recientes
export const useExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Efecto para obtener la lista de productos recientes
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef);
        const querySnapshot = await getDocs(q);
        
        // Obtener los datos de los usuarios asociados a cada producto
        const productsPromises = querySnapshot.docs.map(async docSnapshot => {
          const productData = docSnapshot.data();
          const userDocRef = doc(db, 'users', productData.userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          // Crear el objeto de producto con los datos del usuario
          return {
            id: docSnapshot.id,
            name: productData.name,
            price: productData.price,
            imageUrl: productData.imageUrl || 'https://via.placeholder.com/200',
            seller: userData?.enterpriseName || 'Vendedor',
            description: productData.description || 'Sin descripción disponible'
          };
        });

        // Esperar a que se resuelvan todas las promesas y actualizar el estado
        const productsData = await Promise.all(productsPromises);
        setAllProducts(productsData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filtrar los productos según la búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }

    // Convertir la consulta de búsqueda a minúsculas y dividirla en términos
    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    return allProducts.filter(product => {
      const productText = `${product.name} ${product.description} ${product.seller}`.toLowerCase();
      return searchTerms.every(term => productText.includes(term));
    });
  }, [searchQuery, allProducts]);

  return {
    searchQuery,
    setSearchQuery,
    products: filteredProducts,
    loading
  };
};