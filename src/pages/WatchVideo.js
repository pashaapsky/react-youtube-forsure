import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import VideoPlayer from "../components/YouTubePlayer";
import '../scss/watch-video.scss'

function WatchVideo(props) {
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(document.location.search);
        const videoId = params.get('v');
        console.log(params);
        console.log('params ', );

        if (videoId) {
            setVideoId(videoId);
        }
    }, []);


    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />

                <div className="content-videos watch-video">
                    <VideoPlayer id={videoId}/>

                    <div className="watch-video__similar">

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default WatchVideo;