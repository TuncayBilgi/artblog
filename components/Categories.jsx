import React,{useState,useEffect} from 'react'
import { getCategories } from '../services';
import Link from 'next/link'
const Categories = () => {
  //yes
  const [categories, setCategories] = useState([]);
  useEffect(() => {getCategories().then((result)=> setCategories(result))},[])
  return (
    <div>
    {categories.map((category) => (
      <p>test</p>
    ))}
    </div>
  )
}

export default Categories