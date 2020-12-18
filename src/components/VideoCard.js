import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "../scss/video-card.scss"
import axios from "../configs/youtube";

function VideoCard({className, videoId, images, title, channel, views, timestamp, channelId, description, isSearchCard, isWatchCard, isTrendingCard}) {
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
    }, [getChannelImage]);

    return (
        <div className={`${className} video-card`}>
            <div className="video-card__img">
                <NavLink
                    to={{
                        pathname: "/watch",
                        search: `?v=${videoId}`,
                    }}

                    title="Перейти к просмотру"
                >
                    {isTrendingCard ? (
                        <picture>
                            <source
                                media="(max-width: 576px)"
                                srcSet={`${images.medium}`}
                            />

                            <img
                                className=""
                                src={images.high}
                                alt="Видео"
                            />
                        </picture>
                    ) : (
                        <picture>
                            <source
                                media="(max-width: 576px)"
                                srcSet={`${images.medium}`}
                            />

                            <source
                                media="(max-width: 720px)"
                                srcSet={`${images.high}`}
                            />

                            <source
                                media="(max-width: 960px)"
                                srcSet={`${images.standard}`}
                            />

                            <source
                                media="(max-width: 1140px)"
                                srcSet={`${images.high}`}
                            />

                            <img
                                className=""
                                src={images.high}
                                alt="Видео"
                            />
                        </picture>
                    )}
                </NavLink>
            </div>

            <div className="video-card__info">
                {!(isSearchCard || isWatchCard) &&
                <Avatar className="video-card__avatar" alt={channel} src={channelImage}/>}

                <div className="video-card__text">
                    <h4 className="video-card__header">
                        {isSearchCard || isTrendingCard ? (
                            <a href="" title={title}>
                                {title}
                            </a>
                        ) : (
                            <a href="" title={title}>
                                {title.length > 47 ? title.substr(0, 47) + '...' : title}
                            </a>
                        )}
                    </h4>


                    <div className="video-card__attr">
                        <div className="video-card__channel">
                            {isSearchCard && <Avatar className="video-card__avatar" alt={channel} src={channelImage}/>}

                            <a className="video-card__paragraph" href={`http://youtube.com/channel/${channelId}`}
                               target="_blank" rel="noreferrer">
                                {channel.length > 30 ? channel.substr(0, 30) + '...' : channel}
                                <CheckCircleIcon className="video-card__verified"/>
                            </a>
                        </div>

                        <div className="video-card__time-views">
                            <span className="video-card__paragraph">{views}&nbsp;•&nbsp;</span>
                            <span className="video-card__paragraph">{timestamp}</span>
                        </div>
                    </div>

                    {description && <p className="video-card__description">
                        {isTrendingCard ? (
                            description.substr(0, 240) + '...'
                        ) : (
                            description.substr(0, 150) + '...'
                        )}
                    </p>}

                    {isSearchCard && <span className="video-card__new-badge">
                        Новинка
                    </span>}
                </div>
            </div>
        </div>
    );
}

export default VideoCard;