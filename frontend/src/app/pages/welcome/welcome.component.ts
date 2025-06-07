import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WelcomeComponent {
  userRole = ''; // Set this based on login result (e.g., from localStorage or auth service)
  product = { name: '', description: '', price: null };

  constructor(private apollo: Apollo, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
  }

  createProduct() {
    const CREATE_PRODUCT_MUTATION = gql`
      mutation CreateProduct($name: String!, $description: String, $price: Float!) {
        createProduct(name: $name, description: $description, price: $price) {
          id
          name
        }
      }
    `;

    this.apollo.mutate({
      mutation: CREATE_PRODUCT_MUTATION,
      variables: this.product,
    }).subscribe({
      next: (res) => {
        alert('Product added successfully!');
        this.product = { name: '', description: '', price: null }; // Reset form
      },
      error: (err) => {
        console.error('Product creation failed:', err);
      }
    });
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
