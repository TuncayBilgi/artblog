import React from 'react'
import moment from 'moment';
import Link from 'next/link';


const PostCard = ({post}) => {
  
  return (
    <div className='bg-white drop-shadow-md rounded-lg lg:p-6 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6 pt-0'>
        <img 
          src={post.featureImage.url}
          alt={post.title}
          className='object-center object-cover absolute w-full h-80 rounded-lg drop-shadow-lg'

        />
      </div>
      <h1 className='transition text-3xl text-center font-bold mb-8 cursor-pointer
      hover:text-red-800 hover:font-extrabold'> 
        <Link href={`/post/${post.slug}`}>
        {post.title}
        </Link>
      </h1>

      <div className='block lg:flex items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
          <img 
            src={post.author.photo.url}
            alt={post.author.name}
            height="30px"
            width="30px"
            className='align-middle rounded-full'
          />
          <p className='ml-2' >{post.author.name}</p>
          <img 
            src="../calendar.png"
            alt=""
            height="25px"
            width="25px"
            className='align-middle  ml-8'
          />
          <span className='ml-2' >
            {/*moment(post.createdAt).format('DD MMM YYYY')*/}
          </span>
        </div>
      </div>
      <p className='text-gray-700 text-center mb-8 px-8 lg:px-20 text-lg '>{post.excerpt}</p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="pointer-events-auto rounded-md bg-red-800 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-700 hover:-translate-y-1 inline-block transition">
            Continue Reading
          </span>
        </Link>

      </div>
    </div>
  )
}

export default PostCard