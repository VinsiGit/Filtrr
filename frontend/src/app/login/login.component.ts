// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    //TODO: check if token is deprecated and a new login is required
    if (accessToken) {
      this.authService.isLoggedIn = true;
      this.loginsuccess();
    }
   }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        console.log('Login successful', data); //debug line -> remove in production
        localStorage.setItem('access_token', data.access_token);
        this.loginsuccess();
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error', error);
      }
    });
  }

  loginsuccess() {
    console.log('Login successful');
    this.authService.isLoggedIn = true;
    this.router.navigate(['dashboard']);
  }
}
