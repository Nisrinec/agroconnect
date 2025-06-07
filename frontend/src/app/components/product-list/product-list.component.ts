// src/app/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';  // optional, but you can also just use NgIf, NgFor

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor], // or just CommonModule instead of both
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error(err);
      },
    });
  }
  orderNow(product: Product) {
  alert(`Order placed for: ${product.name}`);
  // Or replace with actual order logic later
}

}
