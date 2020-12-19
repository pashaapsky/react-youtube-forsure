import React, {useContext, useEffect, useState} from 'react';
import axios from '../configs/youtube';
import RowsVideosTemplate from "./RowsVideosTemplate";
import {DataContext} from "../context/DataContext";
import {shuffle} from '../helpers/shuffle';
import '../scss/subscribes-videos.scss';


function SubscriptionsVideos() {
    const [videos, setVideos] = useState([]);
    const {subscriptions} = useContext(DataContext);

    // load videos
    useEffect(() => {
        const getSubscriptionsVideos = async (channelsIds, maxResults = 3) => {
            try {
                let videosIds = [];

                // несколько видео с каналов - id`s
                for (const channel of channelsIds) {
                    await axios.get('/search', {
                        params: {
                            part: "snippet",
                            channelId: channel,
                            order: "date",
                            type: "video",
                            maxResults: maxResults,
                        },
                    })
                        .then(res => {
                            return res.data.items.map(video => (video.id.videoId))
                        })
                        .then(res => {
                            videosIds = [...res, ...videosIds]
                        })
                }

                // видео с полной информацией для отображения
                if (videosIds) {
                    const videos = await axios.get('/videos', {
                            params: {
                                part: "statistics,snippet,player,status",
                                id: videosIds.join(',')
                            }
                        })
                            .then(res => res.data.items)
                    ;

                    shuffle(videos);

                    if (videos) {
                        setVideos(videos);
                    }
                }
            } catch (e) {
                console.error(e.message);
            }
        };

        if (subscriptions) {
            // id каналов
            const channelsIds = subscriptions.map(item => item.snippet.resourceId.channelId).slice(0,10);
            getSubscriptionsVideos(channelsIds);
        }
    }, [subscriptions]);


    return (
        <div className="content-videos subscribes-videos">
            <div className="subscribes-videos__container fixed-container">
                <h2 className="subscribes-videos__header visually-hidden">
                    Пополярные видео у подписчиков
                </h2>

                <div className="subscribes-videos__list videos-list">
                    <RowsVideosTemplate videos={videos} className={"subscribes-videos__item"}/>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionsVideos;