import React, {Fragment} from 'react';
import SideBarFull from "../components/SideBarFull";
import SideBar from "../components/SideBar";
import SearchVideos from "../components/SearchVideos";
import Header from "../components/Header";

function Search(props) {
    return (
        <Fragment>
            <Header />
            
            <div className="content">
                <SideBar />
                <SideBarFull/>

                <SearchVideos/>
            </div>
        </Fragment>
    );
}

export default Search;