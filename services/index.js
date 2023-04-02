import { request, gql } from 'graphql-request'

const graphqlAPI= process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => { 
    const query = gql `
    query MyQuery {
        postsConnection {
            edges {
                node {
                    author {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                    }
              createdAt
              excerpt
              slug
              title
              featureImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
    }
        ` 

        const result = await request(graphqlAPI, query);
        return result.postsConnection.edges
      };

      export const getRecentPosts = async() => {
        const query = gql`
        query getPostsDetails {
          posts(last: 3, orderBy: createdAt_ASC) {
            createdAt
            title
            slug
            featureImage {
              url
            }
          }
        }
        
        `
        const result = await request(graphqlAPI, query)
        return result.posts

      }

      export const getSimilarPosts = async(categories,slug) => {
        const query = gql`
        query getPostDetails($slug: String! ,$categories : [String!]){
          posts(
            where: { slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
            last: 3
          ){
            title
            featureImage {
              url
            }
            createdAt
            slug
          }
        }
        `
        const result = await request(graphqlAPI, query, {categories,slug})
        return result.posts

      }

      export const getCategories = async() => {
        const query = gql`
        query GetCategories {
          categories  {
            name
            slug
          }
        }

        `

        const result = await request(graphqlAPI, query)
        return result.categories
      }

      export const getPostDetails = async (slug) => {
        const query = gql`
          query GetPostDetails($slug : String!) {
            post(where: {slug: $slug}) {
              title
              excerpt
              featureImage {
                url
              }
              author{
                name
                bio
                photo {
                  url
                }
              }
              createdAt
              slug
              content {
                raw
              }
              categories {
                name
                slug
              }
            }
          }
        `;
      
        const result = await request(graphqlAPI, query, { slug });
      
        return result.post;
      };

      export const getPostsByCat = async (slug_contains) => {
        const query = gql`
        query MyQuery($slug_contains: String!) {
          postsConnection(where: {categories_some: {slug_contains: $slug_contains}}) {
            edges {
              node {
                author {
                  bio
                  name
                  id
                  photo {
                    url
                  }
                }
                createdAt
                excerpt
                slug
                title
                featureImage {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
        `
        ;        
      
        const result = await request(graphqlAPI, query, { slug_contains });
      
        return result.postsConnection.edges;
      };

      export const submitComment = async (obj) => {
        const result = await fetch('/api/comments', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify(obj)
           });
        console.log('LE RESULT DU BODY', result);
        return result.json();
      }

      export const getComments = async(slug) => {
        const query = gql`
        query GetComments($slug: String!) {
          comments(where :  {post: {slug : $slug}}){
            name
            createdAt
            comment

          }
        }
        `
        const result = await request(graphqlAPI, query,{slug})
        return result.comments
      }


      