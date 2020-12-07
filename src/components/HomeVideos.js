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

                const response = await axios.get('/videos', {params})
                    .catch(e => {
                        console.log(e.message);
                    })
                ;

                if (response) {
                    setVideos(response.data.items);
                }
            } catch (e) {
                console.log(e.message)
            }
        }, []
    );

    // load videos
    useEffect(() => {
        getVideos();
    }, []);


    return (
        <div className="content-videos home-videos">
            <div className="home-videos__container">
                <h2 className="visually-hidden">Пополярные видео</h2>

                <RowsVideosTemplate videos={videos} className="home-videos__list videos__list"/>
            </div>
        </div>
    );
}

export default HomeVideos;