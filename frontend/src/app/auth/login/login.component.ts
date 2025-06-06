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

  this.apollo.mutate<any>({
    mutation: LOGIN_MUTATION,
    variables: {
      username: this.username,
      password: this.password,
    }
  }).subscribe({
    next: (result) => {
      const loginData = result.data?.login;
      console.log('Login successful:', loginData);
      // Optional: save token
      // localStorage.setItem('token', loginData.accessToken);
      this.router.navigate(['/pages/welcome']); // or your desired route
    },
    error: (error) => {
      console.error('Login failed', error);
    }
  });
}

}