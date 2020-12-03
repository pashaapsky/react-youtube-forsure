import React from 'react';
import "../scss/video-row.scss";

function VideoRow({views, subs, description, timestamp, channel, title, image}) {
    return (
        <div className="video-row">
            <img className="video-row__img" src={image} alt="video"/>

            <div className="video-row__text">
                <h3 className="video-row__title">
                    {title}
                </h3>

                <p className="video-row__paragraph">
                    {channel} * {subs} Subscribers {views} views * {timestamp}
                </p>

                <p className="video-row__paragraph">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default VideoRow;