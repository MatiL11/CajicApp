import { useState, useEffect } from 'react';

interface RecentProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
interface UseRecentProductItemResult {
  formattedPrice: string;
}

// Función para obtener la lista de productos recientes
export const useRecentProductItem = (product: RecentProduct): UseRecentProductItemResult => {
  const [formattedPrice, setFormattedPrice] = useState<string>('');

  useEffect(() => {
    setFormattedPrice(`$${product.price.toFixed(2)}`);
  }, [product.price]);

  return { formattedPrice };
};