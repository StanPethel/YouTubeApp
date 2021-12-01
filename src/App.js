import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';


function App (){
    const[youTubeData, setyoutubedata]= useState(null);
    
    useEffect(() => {
        getyouTubeData();
    }, [])

    function getyouTubeData(){
        const response = await axios.get ('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBt5mU5fYM68eY2fAm67G1gEfwHRzN_D6s&maxResults=30&q=out door living&type=video');
        console.log(response.data);
        setyoutubedata(response.data);
    }

    return(
       

        <div className = "App">
            <Titlebar/>
            <Footer/>
        </div>
    );
}

export default App;