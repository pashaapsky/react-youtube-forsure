import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBarFull from "../components/SideBar";
import SubscribtionsVideos from "../components/SubscribtionsVideos";


function Subscribtions() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBarFull/>

                <SubscribtionsVideos />
            </div>
        </Fragment>
    );
}

export default Subscribtions;