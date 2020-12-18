import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from '../configs/youtube';
import RowsVideosTemplate from "./RowsVideosTemplate";
import {DataContext} from "../context/DataContext";

function SubscriptionsVideos() {
    const [videos, setVideos] = useState([]);
    const {subscribtions} = useContext(DataContext);

    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
    };

    const getSubscriptionsVideos = useCallback(
        async (channelsIds, maxResults = 3) => {
            try {
                let videosIds = [];

                // несколько видео с каналов - id`s
                for (const channel of channelsIds) {
                    const result = await axios.get('/search', {
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

                    await shuffle(videos);

                    if (videos) {
                        setVideos(videos);
                    }
                }
            } catch (e) {
                console.error(e.message);
            }
        }, []
    );

    // load videos
    useEffect(() => {
        if (subscribtions) {
            // id каналов
            const channelsIds = subscribtions.map(item => item.snippet.resourceId.channelId).splice(0,1);
            // getSubscriptionsVideos(channelsIds);
        }
    }, [subscribtions, getSubscriptionsVideos]);

    console.log('videos', videos);

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