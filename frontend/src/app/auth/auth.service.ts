import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String!) {
    register(name: $name, email: $email, password: $password, role: $role) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  register(name: string, email: string, password: string, role: string) {
    return this.apollo
      .mutate({
        mutation: REGISTER_MUTATION,
        variables: { name, email, password, role },
      })
      .pipe(map((result: any) => {
        const token = result?.data?.register?.token;
        if (token) localStorage.setItem('token', token);
        return token;
      }));
  }

  login(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      })
      .pipe(map((result: any) => {
        const token = result?.data?.login?.token;
        if (token) localStorage.setItem('token', token);
        return token;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
