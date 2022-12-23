import axios from '../../utilities/axios';

export const getWishlistAction = () => ({
  type: 'GET_WISHLIST',
  payload: axios.get('/api/wishlist/?page=1&limit=100'),
});
