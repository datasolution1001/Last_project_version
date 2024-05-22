import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

/* eslint-disable camelcase */
const url = process.env.REACT_APP_BACKEND_IP_ADDRESS
class JwtService extends FuseUtils.EventEmitter {
  
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/Auth/Parking/logIn`, {
          params: {
            email,
            password,
          },
        })
        .then((response) => {
          console.log(response)
          if (response.data.userData) {
            this.setSession(response.data.access_token, response.data.refresh_token);
            resolve(response.data.userData);
            this.emit('onLogin', response.data.userData);
          } else {
            reject(response.data.detail);
          }
        });
    });
  };

  

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
      console.log("+++++++++++++++++++++++++++++++++++++++++++++")
      console.log(access_token);
      console.log(refresh_token)
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      localStorage.setItem('jwt_refresh_token', refresh_token);
     
    } else {
      localStorage.removeItem('jwt_access_token');
      console.log("+++++++++++++++++++++++++++++++++++++++++++++")
      console.log(access_token);
      console.log(refresh_token)
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

 signInWithToken = () => {
  const refreshToken = localStorage.getItem('jwt_refresh_token');
    if (!refreshToken) {
        console.error('Refresh token is missing');
        return;
    }
    return new Promise((resolve, reject) => {
      axios
       .post(`${url}/Auth/refresh-token`, { r: refreshToken })
        .then((response) => {
          console.log(response)
          if (response.data.userData) {
            this.setSession(response.data.access_token, refreshToken);
            resolve(response.data.userData);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };
}
const instance = new JwtService();

export default instance;
