import './App.css';
import PostCard from "./components/PostCard.js";
import Container from "@material-ui/core/Container";
import {useState, useEffect} from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/posts');
      const data = await res.json();
      document.title = "Social Network"
  
      console.log(data);
      setPosts(data);
    }
  
    fetchPosts();
  }, [])

  //style={{backgroundColor: "#293647"}}

  return (
    <div className="App">
      <h1>Social Network</h1>
      <Container maxWidth="sm">
        {posts.map((item) => (<PostCard key={item.id} user={item.user} content={item.content} likeCount={item.likes}/>))}
      </Container>
    </div>
  );
}

export default App;
