import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SearchBar from './components/SearchBar/Searchbar';
import VideoDisplay from './components/videodisplay/VideoDisplay';


function App () {

    const [youTubeData, setYouTubedata] = useState(null);
    const [searchTerm, setSearchTerm] = useState("aUIR4iwK4-_1E9PnEjaXfS3NaNY");
    const [videoId, setVideoId] = useState("PyMlV5_HRWk");
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState([]);
    const [replies,setReply] = useState([])

    useEffect(() => {
        getYouTubeData();
        getAllComments();
    }, [searchTerm])

    async function getAllComments(){
        const response = await axios.get (`http://localhost:5000/api/comments/${videoId}`);
        console.log(response.data);
        setComments(response.data);
    }

    async function getAllReplies(){
        const response =await axios.get (`http://localhost:5000/api/comments/${commentId}`);
        console.log(response.data);
        setCommentId(response.data)

    }

    async function getYouTubeData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBt5mU5fYM68eY2fAm67G1gEfwHRzN_D6s&maxResults=30&q=${searchTerm}&type=video`);
        console.log(response.data);
        setYouTubedata(response.data.items);
        setVideoId(response.data.items[0].id.videoId)
    }

    
    
    return(
        <div className = "App">
            {youTubeData &&
                <div>
                    <Titlebar/>
                    <SearchBar value = {setSearchTerm}/>
                    <VideoDisplay videoId = {videoId} />
                        <ul>
                            {comments.map((comment)=> (comment.videoId===videoId)?<li>{comment.text}<ul> {comment.replies.map((reply)=> <li>{reply.text}</li>)}</ul></li>:null)}
                        </ul>
                    <Footer/>
                </div>
            }
        </div>
    );
}

export default App;