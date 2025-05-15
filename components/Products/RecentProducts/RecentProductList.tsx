import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRecentProductList, RecentProduct } from './useRecentProductList';
import styles from './RecentProductListStyles';
import RecentProductItem from './RecentProductItem/RecentProductItem';

const RecentProductList = () => {
  const { recentProducts } = useRecentProductList();

  //Funcion para renderizar cada producto
  const renderRecentProduct = ({ item }: { item: RecentProduct }) => (
    <RecentProductItem product={item} />
  );

  return (
    //Seccion de productos recientes
    <View style={styles.container}>
      <Text style={styles.title}>Productos Recientes</Text>
      <FlatList
        data={recentProducts}
        renderItem={renderRecentProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default RecentProductList;