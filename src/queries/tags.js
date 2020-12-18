import { gql } from "graphql-request";

export const CREATE_TAG = gql`
  mutation CreateTag($body: tags_insert_input!) {
    insert_tags_one(object: $body) {
      id
      name
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query AllTags {
    tags {
      id
      name
    }
  }
`;
