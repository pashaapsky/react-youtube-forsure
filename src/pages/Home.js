import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBarFull from "../components/SideBarFull";
import SideBar from "../components/SideBar";
import HomeVideos from "../components/HomeVideos";


function Home() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />
                <SideBarFull />

                <HomeVideos/>
            </div>
        </Fragment>
    );
}

export default Home;