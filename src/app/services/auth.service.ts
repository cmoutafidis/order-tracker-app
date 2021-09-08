import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {tap} from 'rxjs/operators';
import {LoginData} from '../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loginData: any;

  constructor(private http: HttpClient, private env: EnvService) { }

  login(email: string, password: string) {
    return this.http.post<LoginData>(this.env.apiUrl + '/login', {
      username: email,
      password
    }).pipe(
      tap(loginData => {
        // should store login data here
        this.loginData = loginData;
        this.isLoggedIn = true;
      })
    );
  }
/*
  logout() {
    const requestHeaders = new HttpHeaders({
      'Authorization': this.loginData.token_type + " " + this.loginData.access_token;
    });

    return this.http.get(this.env.apiUrl + 'logout', { headers: requestHeaders })
      .pipe(
      tap(data => {
        //remove data from storage here
        this.isLoggedIn = false;
        delete this.loginData;
        return data;
      })
    )
  }*/

  register(firstName: string, lastName: string, email: string, password: string, userName: string) {
    return this.http.post(this.env.apiUrl + 'account/register', {
      firstName,
      lastName,
      email,
      password,
      userName
    });
  }

}
