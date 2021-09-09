import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {tap} from 'rxjs/operators';
import {LoginData} from '../models/login-data';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {User} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly loginDataKey = 'loginData';

  isLoggedIn = false;
  loginData: LoginData;

  constructor(private http: HttpClient,
              private env: EnvService,
              private storage: NativeStorage) { }

  login(email: string, password: string) {
    return this.http.post<LoginData>(this.env.apiUrl + '/login', {
      username: email,
      password
    }).pipe(
      tap(loginData => {
          this.storage.setItem(this.loginDataKey, JSON.stringify(loginData));
          this.loginData = loginData;
          this.isLoggedIn = true;
        }),
    );
  }

  logout() {
    const requestHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: this.loginData.token_type + ' ' + this.loginData.access_token
    });

    return this.http.get(this.env.apiUrl + '/logout', { headers: requestHeaders })
      .pipe(
        tap(data => {
          this.storage.remove(this.loginDataKey);
          this.isLoggedIn = false;
          delete this.loginData;
          return data;
        })
      );
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(this.env.apiUrl + '/account/register', {
      firstName,
      lastName,
      email,
      password
    });
  }

  fetchUser(email: string) {
    const requestHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: this.loginData.token_type + ' ' + this.loginData.access_token
    });
    return this.http.get<User>(this.env.apiUrl + `/account/${email}`, { headers: requestHeaders });
  }

  retrieveToken() {
    return this.storage.getItem(this.loginDataKey)
      .then(data => {
          this.loginData = JSON.parse(data);
          this.isLoggedIn = this.loginData != null;
        }, error => {
          console.error('An error has occurred while retrieving logged in data', error);
          this.loginData = null;
          this.isLoggedIn = false;
        }
      );
  }

}
