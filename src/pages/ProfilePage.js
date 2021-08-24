import React from 'react'
import {useParams, Redirect} from "react-router-dom";
import {useState, useEffect} from 'react';
import PostCard from '../components/PostCard';
import Container from "@material-ui/core/Container";
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ProfilePage = (props) => {

    let { id } = useParams();

    const [pageProfile, setPageProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPageProfile = async () => {
        try {
            setPageProfile(null);
            const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles/' + id);
            const data = await res.json();
            document.title = data.user_name

            //console.log(data);
            setPageProfile(data);
            await fetchPageProfilePosts();
        } catch (error) {
            setPageProfile(-1);
        }
    }

    const fetchPageProfilePosts = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/user/' + id);
        const data = await res.json();

        //console.log(data);
        setPosts(data);
    }

    const followProfile = async () => {
        if (props.profile.profiles_following.includes(parseInt(id))) {
            props.profile.profiles_following = props.profile.profiles_following.filter(item => item !== parseInt(id));
        }
        else {
            props.profile.profiles_following.push(parseInt(id));
        }
        props.setLoading(true);
        await fetch("https://fast-coast-04774.herokuapp.com/profiles/" + props.profile.profile_id, {
            method: "PUT",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(props.profile)
        });
        await props.fetchFollowingProfiles;
        props.setLoading(false);
    }

    useEffect( () => {
        if (!pageProfile || pageProfile.profile_id !== parseInt(id)) {
            fetchPageProfile();
        } 
        else {
            fetchPageProfilePosts();
        }
    }, [id, props.loading])

    if (!pageProfile) {
        return null;
    }
    else if (pageProfile === -1) {
        return (<Redirect to={
            {
                pathname: '/404',
                state: {
                    from: props.location
                }

            }
        }/>)
    }
    else {
        return (
            <div>
                <h1>{pageProfile.user_name}</h1>
                {(parseInt(id) !== props.profile.profile_id) ? <Button variant="outlined" onClick={()=>{followProfile();}}>{(props.profile.profiles_following.includes(parseInt(id))) ? "Following" : "Follow"}</Button> : null}
                <Container maxWidth="sm">
                    {posts.map((item) => (<PostCard key={item.post_id} post={item} viewer_ID={props.profile.profile_id} setSnackbarOpen={props.setSnackbarOpen} deleteCallback={()=>{
                        props.setDeletingPost(item);
                        props.setDeleteDialogOpen(true);
                    }} commentCallback={() => {
                        // When they click the comment button remember which post they're commenting on
                        props.setCommentingPost(item);
                        // And open the comment dialog
                        props.setCommentDialogOpen(true);
                    }}/>))}
                </Container>
            </div>
        )
    }
}

export default ProfilePage