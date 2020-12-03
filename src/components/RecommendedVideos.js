import React from 'react';
import '../scss/recommended-videos.scss'
import VideoCard from "./VideoCard";

function RecommendedVideos(props) {
    return (
        <div className="rec-videos">
            <h2 className="visually-hidden">Популярные видео</h2>

            <div className="rec-videos__list ">
                <VideoCard
                    title="Hello"
                    views="2.3M Views"
                    timestamp="3 days ago"
                    channelImage="channelImage"
                    channel="channel"
                    image=""
                />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard/>
            </div>
        </div>
    );
}

export default RecommendedVideos;