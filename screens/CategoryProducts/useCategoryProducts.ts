import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  seller: string;
  category: string;
}

// Hook personalizado para obtener la lista de productos por categoría
export const useCategoryProducts = (categoryName: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Efecto para obtener la lista de productos por categoría
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', categoryName)
        );
        
        // Obtener los documentos de la colección
        const querySnapshot = await getDocs(q);
        const productsPromises = querySnapshot.docs.map(async docSnapshot => {
          const productData = docSnapshot.data();
          const userDocRef = doc(db, 'users', productData.userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          // Crear el objeto de producto con los datos
          return {
            id: docSnapshot.id,
            name: productData.name,
            price: productData.price,
            imageUrl: productData.imageUrl || 'https://via.placeholder.com/200',
            seller: userData?.enterpriseName || 'Vendedor',
            description: productData.description || 'Sin descripción disponible',
            category: productData.category
          };
        });

        // Esperar a que se resuelvan todas las promesas
        const products = await Promise.all(productsPromises);
        setProducts(products);
      } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return {
    products,
    loading
  };
};