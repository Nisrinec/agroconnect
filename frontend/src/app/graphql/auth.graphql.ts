import { gql } from 'apollo-angular';

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      access_token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;