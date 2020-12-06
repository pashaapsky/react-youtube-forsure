import React, {useCallback, useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "../scss/video-card.scss"
import axios from "../configs/youtube";

function VideoCard({className, image, title, channel, views, timestamp, channelId, description}) {
    const [channelImage, setChannelImage] = useState('');

    // получаем изображение для канала
    const getChannelImage = useCallback(async () => {
        const result = await axios.get('/channels', {
            params: {
                part: "snippet",
                id: channelId
            }
        });

        if (result) {
            setChannelImage(result.data.items[0].snippet.thumbnails.default.url);
        }
    }, [channelId]);

    useEffect(() => {
        getChannelImage();
    }, []);


    return (
        <div className={`${className} video-card`}>
            <div className="video-card__img">
                <img className="" src={image} alt=""/>
            </div>

            <div className="video-card__info">
                <Avatar className="video-card__avatar" alt={channel} src={channelImage}/>

                <div className="video-card__text">
                    <h4 className="video-card__header">
                        {title}
                    </h4>

                    <div className="video-card__attr">
                        <span className="video-card__paragraph">
                            {channel}
                            <CheckCircleIcon className="video-card__verified"/>
                        </span>

                        <span className="video-card__paragraph">{views}•</span>
                        <span className="video-card__paragraph">{timestamp}</span>
                    </div>

                    {description && <p className="video-card__description">{description.substr(0, 100)}...</p>}
                </div>
            </div>
        </div>
    );
}

export default VideoCard;