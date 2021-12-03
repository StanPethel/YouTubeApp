import React from 'react';

function Titlebar() {
    return(
        <div className= "nav-bar">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" >Enter Video Title</a>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}


 export default Titlebar;
