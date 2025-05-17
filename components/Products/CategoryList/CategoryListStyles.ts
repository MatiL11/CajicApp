import { StyleSheet, Dimensions } from 'react-native';

const CATEGORY_WIDTH = 105;

export default StyleSheet.create({
  container: {
    marginVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 16
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  categoryItem: {
    width: CATEGORY_WIDTH,
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryName: {
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
    textAlign: 'center'
  }
});