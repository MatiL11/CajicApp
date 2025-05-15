import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: cardWidth,
    backgroundColor: '#f0f0f0',
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#5F4DEE',
    fontWeight: 'bold',
  },
  seller: {
    fontSize: 12,
    color: '#888',
  },
});

export default styles;