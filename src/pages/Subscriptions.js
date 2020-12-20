import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBarFull from "../components/SideBarFull";
import SideBar from "../components/SideBar";
import SubscriptionsVideos from "../components/SubscriptionsVideos";


function Subscriptions() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />
                <SideBarFull/>

                <SubscriptionsVideos />
            </div>
        </Fragment>
    );
}

export default Subscriptions;