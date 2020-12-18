import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBarFull from "../components/SideBar";
import SubscriptionsVideos from "../components/SubscriptionsVideos";


function Subscriptions() {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBarFull/>

                <SubscriptionsVideos />
            </div>
        </Fragment>
    );
}

export default Subscriptions;