export const initialState = {
  loading: false,
  errorMessage: '',
  authenticated: localStorage?.getItem('x-social-blocks') ? true : false,
};

export const AuthReducer = (action, initialState) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
        authenticated: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        loading: false,
        authenticated: true,
      };

    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
        authenticated: false,
      };

    case 'LOGIN_ERROR':
      return {
        loading: false,
        authenticated: false,
        errorMessage: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
