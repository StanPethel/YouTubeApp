import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SearchBar from './components/SearchBar/Searchbar';
import VideoDisplay from './components/videodisplay/VideoDisplay';
import CommentDisplay from './components/CommentDisplay/CommentDisplay';
import SideVideo from './components/SideVideo/SideVideo'
import './app.css'


const CommentItem = (props) => {
    const [showAddComment, setShowAddComment] = useState(false)
    const [reply, setReply] = useState('')

    // console.log('commentItem props:', props.comment)

    return(
        <div style={{border: '1px solid grey', margin: '.25rem'}}>
           <div>
                <div className='comment'>
                    <p>
                        {props.comment.text}
                    </p>
                    <div className='comment'>

                    <p>
                        {props.comment.created_at || '14 hours ago'}
                    </p>
                    {showAddComment
                        ?<>
                            <input value={reply} onChange={e=>setReply(e.target.value)} />
                            <button onClick={() =>setShowAddComment(x=>!x)}>Cancel</button>
                            <button onClick={() =>props.postReply(props.comment._id, reply)}>Reply</button>
                        </>
                        :<button onClick={() =>setShowAddComment(x=>!x)}>+</button>
                    }
                    </div>
                </div>
               {props.comment.replies.map((reply)=> <p className='reply'>{reply.text}</p>)}
            </div>

           
           
       </div>
    )
}


function App () {

    const [youTubeData, setYouTubedata] = useState(null);
    const[sideDisplay, setSideDisplay]=useState(null);
    const [searchTerm, setSearchTerm] = useState("puppies");
    const [currentVideo, setCurrentVideo] = useState(null); // "PyMlV5_HRWk"
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState([]);
    // const [replies,setReply] = useState([])
    const [relatedVideos,setRelatedVideos]=useState(null);

    useEffect(() => {
        console.log('init')
        getYouTubeData();
        getAllComments();
    }, [searchTerm])

    useEffect(()=>{
        currentVideo && getAllComments(currentVideo.id.videoId)
    },[currentVideo])

    // useEffect(()=>{
    //     // run once when page loads
    // }, [])

    // useEffect(()=>{
    //     // run on any state change (useful for logging events to a server)
    // })

    async function getAllComments(id){
        const response = await axios.get (`http://localhost:5000/api/comments/${id}`);
        console.log(response.data);
        setComments(response.data);
        
    }
    async function postComment(comment){
        await axios.post(`http://localhost:5000/api/comments`,{
            videoId: currentVideo.id.videoId,
           text:comment
        }).then(res => getAllComments(currentVideo.id.videoId))
    }

    // async function getAllReplies(){
    //     const response =await axios.get (`http://localhost:5000/api/comments/${commentId}`); // post to .../comments/${commentId}/replies
    //     console.log(response.data);
    //     setReply(response.data)

    // }

    async function postReplyToComment(commentId, reply){
        console.log('=================================================')
        console.log('reply to comment:', commentId, reply)
        const response =await axios.post (`http://localhost:5000/api/comments/${commentId}/replies`, {text: reply});
            console.log(response.data);
           getAllComments(currentVideo.id.videoId)
        console.log('=================================================')

    }

    async function getYouTubeData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOQUCG_X7vVMZ24jsV1nVcvLjncOdeE_4&maxResults=30&q=${searchTerm}&type=video&part=snippet`);
        console.log('getYoutubeData: ',response.data);
        setYouTubedata(response.data.items);
        setCurrentVideo(response.data.items[0])
        setRelatedVideos(response.data.items);
    }


    async function getVideoData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBhIYkNlBXUOo2IuQ12yA-8oPk22srjakQ&maxResults=30&q=${searchTerm}&type=video&part=snippet`);
        console.log(response.data.items);
        
    }
    
    
    return(
        <div className = "App">
            {/* youTubeData && */}
                <div>
                    <Titlebar/> 
                    <SearchBar value = {setSearchTerm}/>
                    <div className='main-container'>
                        <div>

                            <VideoDisplay currentVideo={currentVideo}  />
                        <div className='box main-video'>
                            <CommentDisplay commentId= {commentId} postComment={postComment}/>
                            {currentVideo && comments.filter(x=>x.videoId === currentVideo.id.videoId).reverse().map((comment)=> <CommentItem comment={comment} postReply={postReplyToComment} />)}
                        </div>
                        </div>
                        <SideVideo videoId={currentVideo?.id?.videoId} relatedVideos={relatedVideos} setCurrentVideo={setCurrentVideo}/>
                    </div>
                

                    <Footer/>
                </div>
                       
        </div>   
    );
}

export default App;