import React from 'react';
import './videodisplay.css';



const VideoDisplay = (props) => {
    console.log('props', props)
    let urlLink = `https://www.youtube.com/embed/${props.currentVideo && props.currentVideo.id.videoId}?autoplay=1&origin=http://example.com`
    return(
        <div className= "video-display ">
            <iframe  id="ytplayer" type="text/html"
            src= {urlLink}
            frameborder="0">
            </iframe>
            <div className='video-text'>
                <h3 dangerouslySetInnerHTML={{__html:props.currentVideo && props.currentVideo.snippet.title}}></h3>
                <p>{props.currentVideo && props.currentVideo.snippet.channelTitle}</p>
                <p>{props.currentVideo && props.currentVideo.snippet.description}</p>
            </div>
            
        </div>
    )
}

export default VideoDisplay;