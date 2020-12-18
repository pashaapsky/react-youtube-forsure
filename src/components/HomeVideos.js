import React, {useCallback, useEffect, useState} from 'react';
import axios from "../configs/youtube";
import "../scss/home-videos.scss"
import RowsVideosTemplate from "./RowsVideosTemplate";

function HomeVideos(props) {
    const [videos, setVideos] = useState([]);

    const getVideos = useCallback(
        async (maxResults = 24) => {
            try {
                const params = {
                    part: "statistics,snippet,player,status",
                    chart: "mostPopular",
                    maxResults: maxResults,
                    regionCode: 'RU'
                };

                const response = await axios.get('/videos', {params});

                if (response) {
                    setVideos(response.data.items);
                }
            } catch (e) {
                console.error(e.message)
            }
        }, []
    );

    // load videos
    useEffect(() => {
        getVideos();
    }, [getVideos]);


    console.log('videos', videos);

    return (
        <div className="content-videos home-videos">
            <div className="home-videos__container fixed-container">
                <h2 className="visually-hidden">Пополярные видео</h2>

                <div className="home-videos__list videos-list">
                    <RowsVideosTemplate videos={videos} className="home-videos__item"/>
                </div>
            </div>
        </div>
    );
}

export default HomeVideos;