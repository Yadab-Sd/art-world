import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isVisible: boolean = true;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login' || event.url == '/register') {
          this.isVisible = false;
        } else {
          this.isVisible = true;
        }
      }
    });
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }
}
