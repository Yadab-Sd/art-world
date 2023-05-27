import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Token, User } from './registration-page/registration-page.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName!: string;

  constructor() {}

  ngOnInit(): void {
    this.setUserName();
  }

  getAuthToken() {
    return localStorage.getItem('token') as string;
  }

  setAuthToken(token: Token) {
    localStorage.setItem('token', token.token);
    this.setUserName();
  }

  clearToken() {
    localStorage.clear();
    this.setUserName();
  }

  isLoggedIn() {
    if (this.getAuthToken() !== null) {
      return true;
    }
    return false;
  }

  setUserName() {
    const token = this.getAuthToken();
    if (token !== null) {
      if (decode(token)) {
        this.userName = (decode(token) as User).name;
      }
    } else {
      this.userName = 'User';
    }
  }

  getUserName() {
    return this.userName;
  }
}
