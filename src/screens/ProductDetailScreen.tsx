import React, {useState} from 'react';
import {StyleSheet, Image, ScrollView, Platform, ToastAndroid} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Block, Text, Button} from '../components';
import {useCart} from '../context/CartContext';
import {RootStackParamList} from '../navigation';

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const {product} = route.params; // Get the product passed from HomeScreen
  const {addToCart} = useCart();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    addToCart(product);

    // Display success message
    if (Platform.OS === 'android') {
      ToastAndroid.show('Product added to cart!', ToastAndroid.SHORT);
    } else {
      setSuccessMessage('Product added to cart!');
      setTimeout(() => setSuccessMessage(null), 2000); // Clear the message after 2 seconds
    }
  };

  return (
    <Block flex>
      {/* Success Message */}
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <Block style={styles.card}>
          <Image source={{uri: product.image}} style={styles.productImage} />

          <Text h2 bold style={styles.productTitle}>
            {product.title}
          </Text>

          <Text p style={styles.productDescription}>
            {product.description}
          </Text>

          <Text h3 bold style={styles.productPrice}>
            ${product.price.toFixed(2)}
          </Text>

          <Button title="Add to Cart" onPress={handleAddToCart} />
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  productTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  productDescription: {
    marginBottom: 16,
    color: '#6e6e6e',
    lineHeight: 20,
  },
  productPrice: {
    marginBottom: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
  successMessage: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    backgroundColor: '#28A745', // Green success color
    color: '#FFF',
    textAlign: 'center',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    zIndex: 10,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
