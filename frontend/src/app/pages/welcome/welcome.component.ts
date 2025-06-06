import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ This line is important!

@Component({
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [CommonModule], // ✅ Add this
})
export class WelcomeComponent implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.role = user.role;
      console.log('User role:', this.role);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToAddProduct() {
    this.router.navigate(['/pages/add-product']);
  }

  goToViewProducts() {
    this.router.navigate(['/pages/product-list']);
  }
}
