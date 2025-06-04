import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(createUserInput: { username: $username, email: $email, password: $password, role: $role }) {
      id
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      access_token
    }
  }
`;
