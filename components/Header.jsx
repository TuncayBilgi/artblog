import React, {useState, useEffect} from 'react';
import { getCategories } from '../services';
import Link from 'next/link';



const Header = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {getCategories().then((result)=> setCategories(result))},[])
  return (
    <>
    <div className='container mx-auto px-10 mb-4' id='header'>
        <div className=' border-black w-full inline-block py-6 border-b-2'>
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white inline-block'>
                        ArtBlog
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {categories.map((category) => (
                    <Link key={category.slug} href={{pathname:`/category/${category.slug}`,query:{ name: category.name}}}>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
    </>

  )
}

export default Header