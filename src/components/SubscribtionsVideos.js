import React, {useCallback, useContext, useEffect, useState} from 'react';
import VideoCard from "./VideoCard";
import axios from '../configs/youtube';
import {AuthContext} from "../context/AuthContext";

function SubscribtionsVideos() {
    const [videos, setVideos] = useState([]);
    const [channelsId, setChannelsId] = useState([]);
    const {token} = useContext(AuthContext);

    const getSubscriptionsVideos = useCallback(
        async (maxResults = 2) => {

            const response = await axios.get('/subscriptions', {
                    params: {
                        part: "snippet",
                        mine: true,
                        maxResults: maxResults,
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                })
                    .catch(e => {
                        console.log(e.message);
                    })
            ;

            if (response) {
                // setVideos(response.data.items);

                setChannelsId(response.data.items.map(item => (
                    item.snippet.resourceId.channelId
                )));
            }
        }, []
    );

    const getChannelsVideos = useCallback(async (channelsId, maxResults = 3) => {
        for (const item of channelsId) {
            const result = await axios.get('/search', {
                params: {
                    part: "snippet",
                    channelId: item,
                    order: "date",
                    type: "video",
                    maxResults: maxResults,
                },
            })
                .catch(e => {
                    console.log(e);
                });

            if (result) {
                console.log('result', result);
                // console.log('data', result.data.items);
                setVideos(...videos, ...result.data.items);
            }
        }

    }, []);


    // load videos
    useEffect(() => {
        // getSubscriptionsVideos();
    }, [token, getSubscriptionsVideos]);

    useEffect(() => {
        if (channelsId) {
            // getSubscriptionsVideos(channelsId);
        }
    },[]);


    console.log('channelsId', channelsId);
    console.log('videos', videos);

    return (
        <div className="content-videos subscribes-videos">
            <div className="subscribes-videos__container">
                <h2 className="subscribes-videos__header visually-hidden">
                    Пополярные видео у подписчиков
                </h2>

                <div className="subscribes-videos__list ">
                    {/*{videos.map(video => {*/}
                    {/*    const title = video.snippet.title;*/}
                    {/*    const image = video.snippet.thumbnails.medium.url;*/}
                    {/*    const channelTitle = video.snippet.channelTitle;*/}
                    {/*    const channelId = video.snippet.channelId;*/}

                    {/*    return (*/}
                    {/*        <VideoCard*/}
                    {/*            className={"subscribes-videos__item"}*/}
                    {/*            key={video.id}*/}
                    {/*            title={title}*/}
                    {/*            timestamp="3 дня назад"*/}
                    {/*            channelId={channelId}*/}
                    {/*            channel={channelTitle}*/}
                    {/*            image={image}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>
            </div>
        </div>
    );
}

export default SubscribtionsVideos;