import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SearchBar from './components/SearchBar/Searchbar';
import VideoDisplay from './components/videodisplay/VideoDisplay';
import CommentDisplay from './components/CommentDisplay/CommentDisplay';
import SideVideo from './components/SideVideo/SideVideo'




function App () {

    const [youTubeData, setYouTubedata] = useState(null);
    const[sideDisplay, setSideDisplay]=useState(null);
    const [searchTerm, setSearchTerm] = useState("puppies");
    const [videoId, setVideoId] = useState("PyMlV5_HRWk");
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState([]);
    const [replies,setReply] = useState([])
    const [sideVideo,setSideVideo]=useState([]);

    useEffect(() => {
        getYouTubeData();
        getAllComments();
    }, [searchTerm])

    async function getAllComments(){
        const response = await axios.get (`http://localhost:5001/api/comments/${videoId}`);
        console.log(response.data);
        setComments(response.data);
        
    }
    async function postComment(comment){
        await axios.post(`http://localhost:5001/api/comments`,{
            videoId: videoId,
           text:comment
        }).then(res => getAllComments())
    }

    // async function getAllReplies(){
    //     const response =await axios.get (`http://localhost:5000/api/comments/${commentId}`);
    //     console.log(response.data);
    //     setReply(response.data)

    // }

    async function getYouTubeData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOQUCG_X7vVMZ24jsV1nVcvLjncOdeE_4&maxResults=30&q=${searchTerm}&type=video&part=snippet`);
        console.log(response.data);
        setYouTubedata(response.data.items);
        setVideoId(response.data.items[0].id.videoId)
    }


    async function getVideoData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBhIYkNlBXUOo2IuQ12yA-8oPk22srjakQ&maxResults=30&q=${searchTerm}&type=video&part=snippet`);
        console.log(response.data.items);
        setSideDisplay(response.data.items);
        
    }
    
    
    return(
        <div className = "App">
            {/* youTubeData && */}
                <div>
                    <Titlebar/> 
                    <SearchBar value = {setSearchTerm}/>
                    <VideoDisplay videoId = {videoId}  />
                    <CommentDisplay commentId= {commentId} postComment={postComment}/>
                
                        <ul>
                            {comments.map((comment)=> (comment.videoId===videoId)?<li>{comment.text}<ul> {comment.replies.map((reply)=> <li>{reply.text}</li>)}</ul></li>:null)}
                        </ul>
                    <SideVideo videoId={videoId} sideVideoIds = {sideDisplay}/>
                    <Footer/>
                </div>
                       
        </div>   
    );
}

export default App;