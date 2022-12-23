import {combineReducers} from 'redux';

import user from './user';
import booking from './booking';
import wishlist from './wishlist';

export default combineReducers({
  user,
  booking,
  wishlist,
});
