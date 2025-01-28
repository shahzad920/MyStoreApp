import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (limit = 20) => {

  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { limit },
  });

  return response.data;
};
