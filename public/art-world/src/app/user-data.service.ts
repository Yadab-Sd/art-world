import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token, User } from './registration-page/registration-page.component';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private _http: HttpClient) {}

  register(user: User): Observable<User> {
    const url = environment.apiUrl + '/users';
    return this._http.post<User>(url, user.toJSON());
  }

  login(user: User): Observable<Token> {
    const url = environment.apiUrl + '/users/login';
    return this._http.post<Token>(url, user.toJSON());
  }
}
