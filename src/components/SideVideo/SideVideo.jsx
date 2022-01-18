import React from 'react';
import './sideVideo.css';

const SideVideo = (props) => {
    let urlLink = `https://www.youtube.com/embed/${props.videoId}?autoplay=1&origin=http://example.com`
    return(
        <div className="videodisplay">
  
  
    {/* <p>{props.videoId}</p> */}

        {
            props.relatedVideos && props.relatedVideos.map((item) => 
                <div className='side-video-item'>
                    {item.snippet.thumbnails &&
                    <img onClick={()=>props.setCurrentVideo(item)}
                    src={item.snippet.thumbnails.default.url} 
                    // height={item.snippet.thumbnails.default.height}
                    // width={item.snippet.thumbnails.default.width}
                    />
                }
                    <p>{ item.snippet.title }</p>
                </div>
            ) }
    </div>
    )
}

export default SideVideo;