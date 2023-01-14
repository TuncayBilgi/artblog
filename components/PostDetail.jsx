import React from 'react'
import Link from 'next/link'
import moment from 'moment'

const PostDetail = ( {post} ) => {
  
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div>
        <div className='bg-white drop-shadow-md rounded-lg lg:pb-6 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6 pt-0'>
        <img 
          src={post.featureImage.url}
          alt={post.title}
          className='object-center object-cover absolute w-full h-full rounded-t-lg drop-shadow-lg'
        />
      </div>
  
      <div className='flex px-8 mb-8 w-full justify-center'>
        <div className='flex items-center justify-start mb-4 lg:mb-0 w-full mr-8'>
          <img 
            src={post.author.photo.url}
            alt={post.author.name}
            height="30px"
            width="30px"
            className='align-middle rounded-full'
          />
          <p className='ml-2' >{post.author.name} </p>
          </div>
          <div className='flex items-center  justify-end mb-4 lg:mb-0 w-full mr-8'>
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
      <h1 className='transition text-3xl text-center font-bold mb-8 cursor-pointer
      hover:text-red-800 hover:font-extrabold'> 
        <Link href={`/post/${post.slug}`}>
        {post.title}
        </Link>
      </h1>
      <div className='text-gray-700 mb-8 px-8 lg:px-20 text-lg text-justify '>
      {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
      </div>
      </div>


      
    </div>

   
  )
}

export default PostDetail