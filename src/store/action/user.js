import axios from '../../utilities/axios';

export const signinAction = body => ({
  type: 'SIGNIN',
  payload: axios.post('/api/auth/login', body),
});

export const logoutAction = () => ({
  type: 'LOGOUT',
  payload: axios.delete('/api/auth'),
});

export const getUserAction = () => ({
  type: 'GET_USER',
  payload: axios.get('/api/user/details'),
});

export const updateUserAction = form => ({
  type: 'UPDATE_USER',
  payload: axios.patch('/api/user/', form),
});
