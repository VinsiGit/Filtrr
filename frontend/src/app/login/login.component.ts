// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private http: HttpClient) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Call API to check if token is valid
      this.http.get('https://s144272.devops-ap.be/api/mails').subscribe({
        next: () => {
          // Token is valid, perform login success action
          this.auth.loginsuccess();
        },
        error: (error) => {
          if (error.status === 401) {
            // Unauthorized, perform logout action
            this.auth.logout();
          } else {
            console.error('Error checking token:', error);
          }
        }
      });
   }
  }

  login(): void {
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('access_token', data.access_token);
        this.auth.loginsuccess();
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error', error);
      }
    });
  }
}
