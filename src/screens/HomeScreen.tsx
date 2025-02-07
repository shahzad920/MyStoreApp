import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Platform,
  ToastAndroid,
} from 'react-native';
import {fetchProducts} from '../services/api';
import {useCart} from '../context/CartContext';
import {Product} from '../types/product';
import {Block, Button, Text} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {addToCart} = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Product added to cart!', ToastAndroid.SHORT);
    } else {
      setSuccessMessage('Product added to cart!');
      setTimeout(() => setSuccessMessage(null), 2000);
    }
  };
  // Fetch all products
  const loadProducts = useCallback(async () => {
    try {
      const data: Product[] = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsFetching(false);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProducts(); // Reload all products
  };

  const renderItem = ({item}: {item: Product}) => {
    const {title, description, price, image, rating} = item;
    return (
      <Pressable
        onPress={() => navigation.navigate('ProductDetail', {product: item})}>
        <Block card margin={10} padding={16} style={styles.productCard}>
          <Image source={{uri: image}} style={styles.productImage} />
          <Text h3 bold>
            {title}
          </Text>

          <Text p numberOfLines={2} style={styles.productDescription}>
            {description}
          </Text>
          <Text style={styles.viewDetailsText}>View Details</Text>

          <Block style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {rating.rate.toFixed(1)} ({rating.count} reviews)
            </Text>
          </Block>

          <Text h4 bold style={styles.productPrice}>
            ${price.toFixed(2)}
          </Text>

          <Button title="Buy" onPress={() => handleAddToCart(item)} />
        </Block>
      </Pressable>
    );
  };

  if (isFetching) {
    return (
      <Block flex middle>
        <ActivityIndicator size="large" color="#007BFF" />
      </Block>
    );
  }

  return (
    <Block flex>
      {/* Success Message */}
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  productDescription: {
    color: '#6e6e6e',
    marginVertical: 8,
  },
  productPrice: {
    marginBottom: 16,
    color: '#007BFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
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

export default HomeScreen;
