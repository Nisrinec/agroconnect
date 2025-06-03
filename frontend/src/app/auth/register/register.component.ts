import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { REGISTER_MUTATION } from '../../graphql/auth.graphql';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private apollo: Apollo) {}

  register() {
    this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        email: this.email,
        password: this.password,
      },
    }).subscribe({
      next: (result: any) => {
        console.log('Registered:', result.data.register.access_token);
        localStorage.setItem('token', result.data.register.access_token);
      },
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
  }
}
