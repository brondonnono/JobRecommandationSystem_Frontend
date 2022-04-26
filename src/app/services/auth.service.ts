import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8000/api/login';
  apiUrl = environment.apiUrl;

  public userType: string = '';

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  login(email: string, pswd: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    console.log(email, pswd);
    return this.http.post(this.authUrl, {
      grant_type: 'password',
      email: email,
      password: pswd,
      scope: ''
    }, options);
  }

  signUp(email: string, pswd: string, name: string, type: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiUrl + '/register', {
      email: email,
      name: name,
      password: pswd,
      type: type
    }, options);
  }
  /**
   * Revoke the authenticated user token
   */
  logout() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    return this.http.post(this.apiUrl + '/logout', options);
  }

  forgotPassword() {
    
  }
}
