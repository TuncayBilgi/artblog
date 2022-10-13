import React from 'react'

const Author = ({ author }) => {
  return (
    <div className='flex items-center text-center mt-20 bg-white bg-opacity-20 p-6 rounded-lg'>
      <div className='text-start border-r-2 w-36 self-start'>
        <img
          alt= {author.name}
          height = "100px"
          width = "100px"
          className='align-middle rounded-lg m-4'
          src={author.photo.url}
          />
        <h3 className='px-9 font-bold text-xl text-white'>{author.name}</h3>
        
      </div>
      <div className='self-center px-4'>
        <p className='text-justify text-lg text-white'>{author.bio}</p>  
      </div>
      
    </div>
  )
}

export default Author