import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Message,
  MessageType,
} from '../artist-form-drawer/artist-form-drawer.component';
import { UserDataService } from '../user-data.service';

export class User {
  name!: string;
  username!: string;
  password!: string;

  constructor(username: string, password: string, name: string = '') {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  fillData(data: any) {
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
  }

  toJSON() {
    const stringData =
      '{"name":"' +
      this.name +
      '", "username":"' +
      this.username +
      '", "password":"' +
      this.password +
      '"}';
    return JSON.parse(stringData);
  }
}

export class Token {
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  registerForm!: FormGroup;
  validationMessage!: string;
  serverMessage!: Message;
  user!: User;

  constructor(private _userService: UserDataService) {
    this.setMessage('');
    this.user = new User('', '', '');
  }

  ngOnInit(): void {
    this.initializeCreateNewOneForm();
  }

  initializeCreateNewOneForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  setMessage(text: string, type?: MessageType) {
    this.serverMessage = {
      type: type,
      text: text,
    };
  }

  register() {
    const data = this.registerForm.value;
    if (data.password !== data.confirmPassword) {
      this.setMessage('Password mismatched!', 'error');
      return;
    }
    this.user.fillData(data);
    this._userService.register(this.user).subscribe({
      error: (error) => {
        this.setMessage(error.error, 'error');
        console.error(error);
      },
      complete: () => {
        this.setMessage('Registration successful!', 'success');
        this.registerForm.reset();
      },
    });
  }
}
