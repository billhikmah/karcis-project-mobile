const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKING_PENDING":
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case "GET_BOOKING_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data.data,
      };
    case "GET_BOOKING_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};

export default bookingReducer;
