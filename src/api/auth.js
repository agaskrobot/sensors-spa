import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';

import { getUser, performLogin } from './api';
import actions from '../redux/actions/user';

const TOKEN_KEY = 'user_token';

export const getAccessToken = () => sessionStorage.getItem(TOKEN_KEY);

export function useAuth() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState();
  const [accessToken, setAccessToken] = useState(getAccessToken());

  // Update the token's value in the local storage when the token changes
  useEffect(() => {
    if (accessToken) {
      // Get the token expiration in epoch time and save it in milliseconds
      const value = jwt.decode(accessToken, { complete: true });
      const expiration = value.payload.exp * 1000;
      setTokenExpiration(expiration);
      // Persis the token value
      sessionStorage.setItem(TOKEN_KEY, accessToken);
    } else {
      // Clear the expiration time to remove any pending scheduled refresh call
      setTokenExpiration(null);
      // Clear the persisted token value
      sessionStorage.removeItem(TOKEN_KEY);
      // Logout the user when there is no token
      dispatch(actions.removeUser());
    }
  }, [accessToken]);

  useEffect(() => {
    let refreshTimer;
    if (tokenExpiration) {
      const delay = tokenExpiration - Date.now();
      refreshTimer = setTimeout(logout, delay);
    }

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, [tokenExpiration]);

  const logout = () => {
    setAccessToken(null);
  };

  const authenticate = (access, user) => {
    setAccessToken(access);
    getUser(accessToken)
      .then((data) => {
        dispatch(actions.setUser({ ...user, ...data }));
      })
      .catch(setError);
  };

  // Get a new token
  const login = (username, password) => {
    setError(null);
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    performLogin(formData)
      .then((response) => authenticate(response.data.access_token, { username }))
      .catch(setError);
  };

  // Check if the token is no longer valid and if so proceed to logout the user
  if (accessToken) {
    const value = jwt.decode(accessToken, { complete: true });
    if (Date.now() >= value.payload.exp * 1000) {
      logout();
    }
  }

  return { authenticate, login, logout, error };
}
