import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import "../scss/video-card.scss"
import VerifiedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

function VideoCard({image, title, channel, views, timestamp, channelImage, verified}) {

    return (
        <div className="rec-videos__item video-card">
            <div className="video-card__img">
                <img className="" src={image} alt=""/>
            </div>

            <div className="video-card__info">
                <Avatar className="video-card__avatar" alt={channel} src={channelImage}/>

                <div className="video-card__text">
                    <h4 className="video-card__header">
                        {title.substr(0, 50)}
                    </h4>

                    <span className="video-card__paragraph">
                        {channel} {verified && <VerifiedIcon fontSize="small" style={{marginLeft: "2px", fontSize: "14px"}}/>}
                    </span>

                    <span className="video-card__paragraph">{views} • </span>
                    <span className="video-card__paragraph">{timestamp}</span>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;