import gql from "graphql-tag";

// eg. mutation
export const GET_USERS_MUTATION = gql`
  query {
    getUsers {
      _id
      name
      email
      type
      phone
    }
  }
`;

// eg. query
export const GET_RESTUARANT_LIST = gql`
  query {
    restaurants {
     image{
       _id
       height
       width
       url
     }
    }
  }
`;


export const GET_AUTH = gql`
  query Me($token: String) {
    me(token: $token) {
      email
      phone
      name
      isActive
      _id
      role
    }
  }
`;

export const AUTH = gql`
  {
    auth {
      email
      phone

      isActive
      _id
      role
    }
  }
`;
