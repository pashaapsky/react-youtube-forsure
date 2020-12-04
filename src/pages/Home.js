import React, {Fragment, useContext} from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RecommendedVideos from "../components/RecommendedVideos";
import {AuthContext} from "../context/AuthContext";

function Home() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar/>
                <RecommendedVideos/>
            </div>
        </Fragment>
    );
}

export default Home;