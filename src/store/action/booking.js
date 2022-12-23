import axios from '../../utilities/axios';

export const getBookingAction = () => ({
  type: 'GET_BOOKING',
  payload: axios.get('/api/booking'),
});
