import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import FeaturedProducts from '../../../components/Products/FeaturedProducts/FeaturedProducts';
import Categories from '../../../components/Products/CategoryList/CategoryList';
import RecentProducts from '../../../components/Products/RecentProducts/RecentProductList';
import BottomNavBar from '../../../components/BottomNavBar/BottomNavBar';
import Header from '../../../components/Common/Header/Header';
import styles from './HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header 
        title="CajicApp"
        showBackButton={false}
      />

      {/* Contenido */}
      <FlatList
        data={[
          { id: '1', component: <FeaturedProducts /> },
          { id: '2', component: <Categories /> },
          { id: '3', component: <RecentProducts /> }
        ]}
        renderItem={({ item }) => item.component}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
      <BottomNavBar />
    </View>
  );
};

export default HomeScreen;