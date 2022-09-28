import React from 'react'

const PostCard = ({post}) => {
  return (
    <div>PostCard
        {post.title}
        {post.except}
        
    </div>
  )
}

export default PostCard