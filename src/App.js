import './App.css';
import PostCard from "./components/PostCard.js";
import SubmitPostDialog from './components/SubmitPostDialog';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import {useState, useEffect} from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  
  const handleSubmit = async (post) => {
    setOpen(false);
    console.log(post)
    const newPost = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify(post)
    });
    console.log(newPost);
    await fetchPosts();
  };

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/posts');
    const data = await res.json();
    document.title = "Social Network"

    console.log(data);
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, [])

  //style={{backgroundColor: "#293647"}}

  return (
    <div className="App">
      <h1>Social Network</h1>
      <Button size={"small"} onClick={() => {setOpen(true);}}>Post</Button>
      <Container maxWidth="sm">
        {posts.map((item) => (<PostCard key={item.post_id} user={item.user_name} content={item.content} likeCount={item.likes}/>))}
      </Container>
      <SubmitPostDialog open={open} handleClose={() => {setOpen(false);}} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
