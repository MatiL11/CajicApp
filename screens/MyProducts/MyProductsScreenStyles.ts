import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5F4DEE',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  },
  editButton: {
    marginBottom: 8
  },
  deleteButton: {
    marginTop: 8
  },
  priceEditContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#5F4DEE',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    width: 100
  },
  saveButton: {
    padding: 4
  },
  cancelButton: {
    padding: 4
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  addButton: {
    backgroundColor: '#5F4DEE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});