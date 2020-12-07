import React from 'react';
import VideoCard from "./VideoCard";

function RowsVideosTemplate({videos, className}) {
    return (
        <div className={className}>
            {videos.map(video => {
                let title = video.snippet.title;

                if (title.length > 50) {
                    title = title.substr(0, 50) + "..."
                }

                const views = video.statistics.viewCount;
                const image = video.snippet.thumbnails.high.url;
                const channelTitle = video.snippet.channelTitle;
                const channelId = video.snippet.channelId;

                return (
                    <VideoCard
                        className={"home-videos__item "}
                        key={video.id}
                        title={title}
                        views={`${views} просмотров`}
                        timestamp="3 дня назад"
                        channelId={channelId}
                        channel={channelTitle}
                        image={image}
                    />
                )
            })}
        </div>
    );
}

export default RowsVideosTemplate;