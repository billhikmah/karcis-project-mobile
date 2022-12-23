const initialState = {
  userInfo: [],
  isLoading: false,
  errorMessage: null,
  role: '',
  token: '',
  refreshToken: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'SIGNIN_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        role: action.payload.data.data.role,
        token: action.payload.data.data.token,
        refreshToken: action.payload.data.data.refreshToken,
      };
    case 'SIGNIN_REJECTED':
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    case 'LOGOUT_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'LOGOUT_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        role: '',
        token: '',
        refreshToken: '',
        userInfo: [],
      };
    case 'LOGOUT_REJECTED':
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    case 'GET_USER_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        userInfo: action.payload.data.data,
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    case 'UPDATE_USER_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'UPDATE_USER_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
      };
    case 'UPDATE_USER_REJECTED':
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

export default userReducer;
