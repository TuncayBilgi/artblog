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

      export const getSimilartPosts = async() => {
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
        const result = await request(graphqlAPI, query)
        return result.posts

      }