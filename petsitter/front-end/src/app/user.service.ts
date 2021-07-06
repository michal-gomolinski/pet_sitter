import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions: any;
  public token: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  endpoint = '';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public login(user) {
    this.http
      .post(
        this.endpoint + '/api-token-auth/',
        JSON.stringify(user),
        this.httpOptions
      )
      .subscribe(
        (data) => {
          this.updateData(data['token']);
          window.location.reload();
        },
        (error) => {
          this.errors = 'Problem with logging in';
        }
      );
  }
  public register(user) {
    this.http
      .post(
        this.endpoint + '/api/users',
        JSON.stringify(user),
        this.httpOptions
      )
      .subscribe(
        (data) => {
          console.log(data);
          window.alert('Successfully registered accont');
          window.location.reload();
        },
        (error) => {
          this.errors = error['error'];
        }
      );
  }
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.location.reload();
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('token', token);
  }
  public refreshToken() {
    this.http
      .post(
        this.endpoint + '/api-token-refresh/',
        JSON.stringify({ token: this.token }),
        this.httpOptions
      )
      .subscribe(
        (data) => {
          this.updateData(data['token']);
        },
        (err) => {
          this.errors = err['error'];
        }
      );
  }
  public getToken() {
    return sessionStorage.getItem('token');
  }

  create(post, token) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.getToken(),
      }),
    };
    return this.http.post(
      this.endpoint + '/api/pets',
      JSON.stringify(post),
      httpOptions
    );
  }

  list() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.getToken(),
      }),
    };
    return this.http.get(this.endpoint + '/api/pets-for-user', httpOptions);
  }
  createHuman(human: FormData) {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'JWT ' + this.getToken(),
      }),
    };
    return this.http.put(this.endpoint + '/api/humans', human, httpOptions);
  }
  getProfile() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.getToken(),
      }),
    };
    return this.http.get(this.endpoint + '/api/profile', httpOptions);
  }

  listHuman() {
    return this.http.get(this.endpoint + '/api/humans');
  }
}
