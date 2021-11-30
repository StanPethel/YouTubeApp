import React, {Component} from 'react';
import Titlebar from './TitleBar/Titlebar';




class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            Titlebar: '',
        };
    }

    render(){
        return(
            <div> 
                <Titlebar />
            </div>
        )
    }
}
export default App;