const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WISHLIST_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'GET_WISHLIST_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data.data,
      };
    case 'GET_WISHLIST_REJECTED':
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
        data: [],
      };
    default: {
      return state;
    }
  }
};

export default wishlistReducer;
