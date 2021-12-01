import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SearchBar from './components/SearchBar/Searchbar';


function App () {

    const[youTubeData, setyouTubedata] = useState(null);
    const [loading,setLoading] = useState(false);
    const [search, setSearch] = useState ("");
    const[searchTerm, setSearchTerm] = useState("out door living");
    const [videoId, setVideoId] = useState("PyMlV5_HRWk");
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState([]);
    const [replies,setReply] = useState([])

    useEffect(() => {
       // getyouTubeData();
       getAllComments();
    }, [])

    async function getAllComments(){
        const response = await axios.get (`http://localhost:5000/api/comments/${videoId}`);
        console.log(response.data);
        setComments(response.data);
    }

    async function getAllReplies(){
        const response =await axios.get (`http://localhost:5000/api/comments/${commentId}`);
    }

    async function getyouTubeData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBt5mU5fYM68eY2fAm67G1gEfwHRzN_D6s&maxResults=30&q=${searchTerm}&type=video`);
        console.log(response.data);
        setyouTubedata(response.data);
    }

    // useEffect(() =>{
    //     setSearchTerm(
    //         videos.filter((video) =>
    //         video.name.toLowerCase().includes(search.toLowerCase())
    //         )
    //     );
    // },  [search,videos]);
    //     if(loading){
    //         return<p>Loading videos...</p>
    // }
    
    function searchResults(){
        <input type = "text" placeholder= "SearchVideos" onChange = {(e) => setSearchTerm(e.target.value)}/>
        {setSearchTerm.map((video,idx) => (
            <videoDetail key = {idx} {...video}/>
        ))}
    }
    
        

    return(
        <div className = "App">
            <ul>
                {comments.map((comment)=> (comment.videoId===videoId)?<li>{comment.text}<ul> {comment.replies.map((reply)=> <li>{reply.text}</li>)}</ul></li>:null)}
            </ul>
            

            {youTubeData &&
                <div>
                    <h1></h1>
                    <Titlebar/>
                    <SearchBar SearchVideos = {searchResults} />
                    <Footer/>
                </div>
            }
        </div>
    );
}

export default App;