import React, {Fragment} from 'react';
import moment from "moment";
import 'moment/locale/ru';
import VideoCard from "./VideoCard";

moment.locale('ru');

function RowsVideosTemplate({videos, className, showDescription, isSearchCard, isWatchCard, isTrendingCard}) {
    if (videos) {
        return (
            <Fragment>
                {videos.map((video, index) => {
                    const title = video.snippet.title;
                    const views = Number(video.statistics.viewCount).toLocaleString('ru-RU');

                    const images = {
                        default : video.snippet.thumbnails.default ? video.snippet.thumbnails.default.url : '',     //120x90
                        medium : video.snippet.thumbnails.medium ? video.snippet.thumbnails.medium.url : '',        //320x180
                        high : video.snippet.thumbnails.high ? video.snippet.thumbnails.high.url : '',              //480x360
                        standard : video.snippet.thumbnails.standard ? video.snippet.thumbnails.standard.url : '',  //640x480
                        maxres : video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.url : '',        //1280x720
                    };

                    const timeFromPublish = moment(video.snippet.publishedAt).fromNow();

                    const channelTitle = video.snippet.channelTitle;
                    const channelId = video.snippet.channelId;

                    let descriptions = '';
                    if (showDescription) {
                        descriptions = video.snippet.description;
                    }

                    return (
                        <VideoCard
                            className={className}
                            key={index}
                            videoId={video.id}
                            title={title}
                            views={`${views} просмотров`}
                            timestamp={timeFromPublish}
                            channelId={channelId}
                            channel={channelTitle}
                            images={images}
                            description={descriptions}
                            isSearchCard={isSearchCard}
                            isWatchCard={isWatchCard}
                            isTrendingCard={isTrendingCard}
                        />
                    )
                })}
            </Fragment>
        );
    } else return null;
}

export default RowsVideosTemplate;