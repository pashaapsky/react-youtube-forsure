import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBarFull from "../components/SideBarFull";
import TrendingVideos from "../components/TrendingVideos";
import SideBar from "../components/SideBar";

function InTrends({categoryName, categoryId}) {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar/>
                <SideBarFull/>

                <TrendingVideos categoryName={categoryName} categoryId={categoryId}/>
            </div>
        </Fragment>
    );
}

export default InTrends;