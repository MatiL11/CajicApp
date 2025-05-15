import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, 
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: itemWidth,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 14,
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#333', 
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F4DEE',
    marginBottom: 6, 
  },
  seller: {
    fontSize: 12,
    color: '#666',
    marginTop: 2, 
  },
});

export default styles;