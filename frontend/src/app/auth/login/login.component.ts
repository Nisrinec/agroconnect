import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LOGIN_MUTATION } from '../../graphql/auth.graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // re
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private apollo: Apollo) {}

  login() {
    this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: this.email,
        password: this.password,
      },
    }).subscribe({
      next: (result: any) => {
        console.log('Logged in:', result.data.login.access_token);
        localStorage.setItem('token', result.data.login.access_token);
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }
}
