import React from 'react'
import PostCard from '../components/PostCard'
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';

const SinglePostPage = () => {

    let { id } = useParams();

    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/' + id);
        const data = await res.json();
        document.title = "Social Network"

        console.log(data);
        setPost(data);
    }
    useEffect( () => {
        fetchPost();
    }, [])

    return (
        (post) ? 
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: "50%"
        }}
        >
            <PostCard key={post.post_id} post={post} viewer_ID={-1}/>
        </div> :
        null
    )
}

export default SinglePostPage