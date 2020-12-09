import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function WatchVideo(props) {
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(document.location.search);
        console.log(params);
        console.log('params ', params.get('v'));
    });


    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />

                <div className="content-videos watch-video">
                    <div className="watch-video__container">
                        <h2 className="visually-hidden">Видео проигрыватель</h2>

                        <div className="watch-video__list videos-list">

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default WatchVideo;