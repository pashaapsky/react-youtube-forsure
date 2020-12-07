import React, {Fragment, useEffect} from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import HomeVideos from "../components/HomeVideos";


function Home() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />

                <HomeVideos/>
            </div>
        </Fragment>
    );
}

export default Home;