import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.7;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginLeft: 14,
    marginRight: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: cardWidth * 0.6,
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: '#5F4DEE',
    fontWeight: 'bold',
  },
});

export default styles;