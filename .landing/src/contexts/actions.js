import { loginUser, socialApi } from '../services';

export async function login(dispatch, loginPayload) {
  try {
    await dispatch({ type: 'REQUEST_LOGIN' });
    const response = await loginUser(loginPayload);

    if (response?.accessToken) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });

      localStorage.setItem('x-social-blocks', response.accessToken);
      socialApi.defaults.headers.authorization =
        'Bearer ' + response.accessToken;

      return true;
    } else {
      await dispatch({ type: 'LOGIN_ERROR', error: response });
      return false;
    }
  } catch (e) {
    console.log(e);
    await dispatch({ type: 'LOGIN_ERROR', error: e });
    return false;
  }
}

export async function logout(dispatch) {
  await dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('x-social-blocks');
  localStorage.removeItem('updater-sk');

  return true;
}
