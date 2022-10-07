import React , {useState,useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts } from '../services'
import { getSimilarPosts } from '../services'
import { getPosts } from '../services'


const PostWidget = ({categories,slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
      getRecentPosts()
            .then((result) => setRelatedPosts(result))
            .then(() => console.log(relatedPosts));
      //getPosts().then((result) => setRelatedPosts(result))
    },[]
  ) 
 
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => {
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img 
            alt = {post.title}
            height = "60px"
            widht = "60px"
            className='align-middle rounded'
            src={post.featureImage.url}
            />
          </div>
        
        <div className='flex-grow ml-4'>
          <p className='text-grey-500 font-xs'>{moment(post.createdAt).format('DD MMM, YYYY')}</p>
          <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>{post.title}</Link>
        
        </div>

        </div>
      })}
      PostWidget
        
    </div>
  )
}

export default PostWidget