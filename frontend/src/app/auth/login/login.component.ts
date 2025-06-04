import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { LOGIN_MUTATION } from '../../graphql/mutations';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private apollo: Apollo) {}

   login() {
  this.apollo.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      username: this.username,
      password: this.password,
    },
  }).subscribe({
    next: (result: any) => {
      console.log('Login success:', result);
      localStorage.setItem('token', result.data.login.access_token);
    },
    error: (error: any) => {
      console.error('Login error:', error);
    }
  });
}
}
