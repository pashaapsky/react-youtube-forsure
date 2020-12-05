import React, {Fragment} from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TrendingVideos from "../components/TrendingVideos";

function InTrends({categoryName, categoryId}) {
    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar/>

                <TrendingVideos categoryName={categoryName} categoryId={categoryId}/>
            </div>
        </Fragment>
    );
}

export default InTrends;