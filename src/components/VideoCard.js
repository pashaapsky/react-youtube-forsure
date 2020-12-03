import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import "../scss/video-card.scss"

function VideoCard({image, title, channel, views, timestamp, channelImage}) {

    return (
        <div className="rec-videos__item video-card">
            <img className="video-card__img" src="" alt=""/>

            <div className="video-card__info">
                <Avatar className="video-card__avatar" alt={channel} src={channelImage}/>

                <div className="video-card__text">
                    <h4 className="video-card__header">{title}</h4>
                    <p className="video-card__paragraph">{channel}</p>
                    <p className="video-card__paragraph">{views} * {timestamp}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;