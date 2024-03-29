import React,{useState,useEffect} from 'react'
import { getCategories } from '../services';
import Link from 'next/link'
const Categories = () => {
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {getCategories().then((result)=> setCategories(result))},[])

  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
    {categories.map((category) => (
      
      <Link href={{pathname:`/category/${category.slug}`,query:{ name: category.name}}} key={category.slug}>
       <span className='text-md font-medium pb-3 mb-3 cursor-pointer block'> {category.name} </span>
      </Link>
     


    ))}
    </div>
  )
}

export default Categories