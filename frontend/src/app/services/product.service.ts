// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts(): Observable<Product[]> {
    return this.apollo
      .watchQuery<{ products: Product[] }>({
        query: gql`
          query GetProducts {
            products {
              id
              name
              description
              price
            }
          }
        `,
      })
      .valueChanges.pipe(map(result => result.data.products));
  }
}
