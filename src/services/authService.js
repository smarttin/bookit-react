import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {
  tokenKey = 'auth_token';
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }

  getTokenExpiration(token) {
    const { exp } = this.decode(token);
    return moment.unix(exp);
  }

  getUsername() {
    return this.decode(this.getToken()).username;
  }

  isValid(token){
    return moment().isBefore(this.getTokenExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return (token && this.isValid(token)) ? true : false;
  }
}

const authService = new AuthService();
Object.freeze(authService);
export default authService;