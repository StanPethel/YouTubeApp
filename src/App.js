import React, {useState, useEffect} from 'react';
import Titlebar from './components/TitleBar/Titlebar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SearchBar from './components/SearchBar/Searchbar';


function App () {

    const[youTubeData, setyouTubedata] = useState(null);
    const[searchTerm, setsearchTerm] = useState("out door living")

    useEffect(() => {
        getyouTubeData();
    }, [])

    async function getyouTubeData(){
        const response = await axios.get (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBt5mU5fYM68eY2fAm67G1gEfwHRzN_D6s&maxResults=30&q=${searchTerm}&type=video`);
        console.log(response.data);
        setyouTubedata(response.data);
    }

    function getSearchTerm(){
        

    return(
        <div className = "App">
            {youTubeData &&
                <div>
                    <h1></h1>
                    <Titlebar/>
                    <SearchBar/>
                    <Footer/>
                </div>
            }
        </div>
    );
}

export default App;