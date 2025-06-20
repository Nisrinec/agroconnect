import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private apollo: Apollo, private router: Router) {}

  login() {
  const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        accessToken
        user {
          username
          email
          role
        }
      }
    }
  `;

  this.apollo.mutate({
  mutation: LOGIN_MUTATION,
  variables: {
    username: this.username,
    password: this.password,
  }
}).subscribe({
  next: (result: any) => {
    const { accessToken, user } = result.data.login;

    // ✅ Store token and user in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    // ✅ Navigate to welcome page
    this.router.navigate(['/pages/welcome']);
  },
  error: (error) => {
    console.error('Login failed', error);
  }
});
  }

}