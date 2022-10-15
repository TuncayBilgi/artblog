import {GraphQLClient,gql} from "graphql-request"
import { request } from "http";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export default async function postComment(req,res) {
    const {name, email, slug, comment} = req.body
    const graphqlClient = new GraphQLClient(graphqlAPI,{
        headers : {
            authorization : `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });

    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

    try {
    const result = await graphqlClient.request(query, req.body)
    return res.status(200).send(result)
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }

    }

