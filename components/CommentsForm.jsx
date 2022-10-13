import React,{useState,useEffect,useRef} from 'react'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mt-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>CommentsForm</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
        ref={commentEl} 
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus-gray-200 bg-gray-100 text-gray-700'
        placeholder='Comment'
        name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type="text"
          ref={nameEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus-gray-200 bg-gray-100 text-gray-700'
          placeholder='Name'
          name='name'

         />
      <input
          type="text"
          ref={emailEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus-gray-200  bg-gray-100 text-gray-700'
          placeholder='Email'
          name='email'

         />

      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'></div>
    </div>
  )
}

export default CommentsForm