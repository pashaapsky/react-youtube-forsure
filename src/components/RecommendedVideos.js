import React from 'react';
import '../scss/recommended-videos.scss'
import VideoCard from "./VideoCard";

function RecommendedVideos(props) {
    return (
        <div className="rec-videos">
            <h2 className="visually-hidden">Популярные видео</h2>

            <div className="rec-videos__list ">
                <VideoCard
                    title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis culpa dicta, excepturi expedita neque odio officiis soluta! Id labore laboriosam non placeat quo voluptate? Aperiam maxime modi perferendis veniam!"
                    views="100 тыс. просмотров"
                    timestamp="3 дня назад"
                    channelImage="channelImage"
                    verified
                    channel="channel name"
                    image="https://place-hold.it/320x180"
                />
                <VideoCard
                    title="Hello"
                    views="2.3M Views"
                    timestamp="3 days ago"
                    channelImage="channelImage"
                    verified
                    channel="channel"
                    image="https://place-hold.it/540x460"
                />

                <VideoCard
                    title="Hello friend Hello friendHello friendHello friendHello friendHello friendHello friend"
                    views="2.3M Views"
                    timestamp="3 days ago"
                    channelImage="channelImage"
                    verified
                    channel="channel"
                    image="https://place-hold.it/320x180"
                />

                <VideoCard
                    title="Hello"
                    views="2.3M Views"
                    timestamp="3 days ago"
                    channelImage="channelImage"
                    verified
                    channel="channel"
                    image="https://place-hold.it/320x180"
                />

                <VideoCard
                    title="Hello"
                    views="2.3M Views"
                    timestamp="3 days ago"
                    channelImage="channelImage"
                    verified
                    channel="channel"
                    image="https://place-hold.it/320x180"
                />

            </div>
        </div>
    );
}

export default RecommendedVideos;