import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";


import { getCategories, getPostsByCat } from '../../services'
import { PostCard } from '../../components'


const Category = ({ posts }) => {

    const router = useRouter();
    const categoryLabel = router.query.name;
    console.log('posts', posts);


    return (
        <>
            <div className='flex flex-col place-items-center '>
                <div className='flex justify-center bg-white w-fit px-4 py-1 rounded-md bg-opacity-40'>
                    <h1 className='font-bold text-2xl text-white'>Category : {categoryLabel}</h1>
                </div>

                {posts.length == 0 ? <p className='p-8 text-white text-2xl font-semibold'>"Sorry, there is no post in this category yet"</p> : ''}

                <div className='p-4 w-full sm:w-3/4 '>
                    {posts.map((post, index) => (<PostCard post={post.node} key={post.node.title} />))}
                </div>
            </div>
        </>
    )
}

export default Category

export async function getStaticProps({ params }) {
    const posts = await getPostsByCat(params.slug)
    console.log(posts)
    return {
        props: { posts: posts },
    }
}

export async function getStaticPaths() {

    const categories = await getCategories();

    return {
        paths: categories.map((category) => { return { params: { slug: category.slug } } }),
        fallback: false, // can also be true or 'blocking'
    }
}

