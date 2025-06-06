import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { REGISTER_MUTATION } from '../../graphql/mutations';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role = 'buyer'; // default

  constructor(private apollo: Apollo, private router: Router) {}

  register() {
    this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
        }
      }
    }).subscribe({
      next: (result) => {
        console.log('User registered:', result);
        // ✅ Redirect after successful registration
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
  }
}
