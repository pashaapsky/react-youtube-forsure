import React, {useCallback, useContext, useEffect, useState} from 'react';
import VideoCard from "./VideoCard";
import axios from '../configs/youtube';
import {AuthContext} from "../context/AuthContext";
import RowsVideosTemplate from "./RowsVideosTemplate";

function SubscribtionsVideos() {
    const [videos, setVideos] = useState([]);
    const {token} = useContext(AuthContext);

    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
    };

    const getSubscriptionsVideos = useCallback(
        async (maxResults = 3) => {
            try {
                let videos = [];
                let videosId = [];

                // каналы пользователя - id`s
                const channels = await axios.get('/subscriptions', {
                        params: {
                            part: "snippet",
                            mine: true,
                            maxResults: 10
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    })
                    // id каналов
                        .then(res => {
                            return res.data.items.map(item => (
                                item.snippet.resourceId.channelId
                            ));
                        })
                ;

                // несколько видео с каналов - id`s
                for (const channel of channels) {
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
                            videosId = [...res, ...videosId]
                        })
                }

                // видео с полной информацией для отображения
                for (const item of videosId) {
                    await axios.get('/videos', {
                        params: {
                            part: "statistics,snippet,player,status",
                            id: item
                        }
                    })
                        .then(res => {
                            videos = [res.data.items[0], ...videos]
                        })
                }

                await shuffle(videos);

                if (videos) {
                    setVideos(videos);
                }
            } catch (e) {
                console.error(e.message);
            }
        }, [token]
    );

    // load videos
    useEffect(() => {
        // getSubscriptionsVideos();
    }, []);

    console.log('videos', videos);

    return (
        <div className="content-videos subscribes-videos">
            <div className="subscribes-videos__container">
                <h2 className="subscribes-videos__header visually-hidden">
                    Пополярные видео у подписчиков
                </h2>

                <RowsVideosTemplate videos={videos} className="subscribes-videos__list"/>
            </div>
        </div>
    );
}

export default SubscribtionsVideos;