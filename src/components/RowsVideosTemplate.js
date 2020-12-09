import React, {Fragment} from 'react';
import VideoCard from "./VideoCard";

function RowsVideosTemplate({videos, className, showDescription, isSearchCard}) {
    if (videos) {
        return (
            <Fragment>
                {videos.map(video => {
                    const title = video.snippet.title;

                    const views = video.statistics.viewCount;
                    const image = video.snippet.thumbnails.medium.url;
                    const channelTitle = video.snippet.channelTitle;
                    const channelId = video.snippet.channelId;

                    let descriptions = '';
                    if (showDescription) {
                        descriptions = video.snippet.description;
                    }

                    return (
                        <VideoCard
                            className={className}
                            key={video.id}
                            videoId={video.id}
                            title={title}
                            views={`${views} просмотров`}
                            timestamp="3 дня назад"
                            channelId={channelId}
                            channel={channelTitle}
                            image={image}
                            description={descriptions}
                            isSearchCard={isSearchCard}
                        />
                    )
                })}
            </Fragment>
        );
    } else return null;
}

export default RowsVideosTemplate;