import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  MessageType,
} from '../artist-form-drawer/artist-form-drawer.component';
import { AuthService } from '../auth.service';
import { Token, User } from '../registration-page/registration-page.component';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  validationMessage!: string;
  serverMessage!: Message;
  user!: User;
  isLoading!: boolean;

  constructor(
    private _userService: UserDataService,
    private _authService: AuthService
  ) {
    this.setMessage('');
    this.user = new User('', '', '');
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.initializeCreateNewOneForm();
  }

  initializeCreateNewOneForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  setMessage(text: string, type?: MessageType) {
    this.serverMessage = {
      type: type,
      text: text,
    };
  }

  login() {
    const data = this.loginForm.value;
    this.user.fillData(data);
    this.isLoading = true;
    this._userService.login(this.user).subscribe({
      next: (token) => {
        this._authService.setAuthToken(token);
      },
      error: (error) => {
        this.isLoading = false;
        this.setMessage(error.error, 'error');
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
        this.setMessage('Login successful!', 'success');
        this.loginForm.reset();
      },
    });
  }

  logout() {
    this._authService.clearToken();
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  getUserName() {
    return this._authService.getUserName();
  }
}
