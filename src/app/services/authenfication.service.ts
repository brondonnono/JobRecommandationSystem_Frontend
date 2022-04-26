import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenficationService {

  //variables
  authUrl = 'http://localhost:8000/api/login';
  apiUrl = 'http://localhost:8000/api';
  options: any;
  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * recuperation du token d'accès
   * @param e l'addresse email de type string
   * @param p le mot de passe de type string
   */
  login(e: string, p: string) {
    return this.http.post(this.authUrl, {
      email: e,
      password: p
    }, this.options);
  }

  /**
   * Revoke the authenticated user token
   */
   logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    return this.http.get(this.apiUrl + '/logout', this.options);
  }

  signUp(e: string, p: string, name: string) {
    return this.http.post(this.apiUrl + '/register', {
      email: e,
      name: name,
      password: p
    }, this.options);
  }


}
