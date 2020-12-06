import React, {useCallback, useEffect, useState} from 'react';
import axios from "../configs/youtube";
import VideoCard from "./VideoCard";
import "../scss/home-videos.scss"

function HomeVideos(props) {
    const [videos, setVideos] = useState([]);

    const getVideos = useCallback(
        async (maxResults = 24) => {

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

        }, []
    );

    // load videos
    useEffect(() => {
        // getVideos();
    }, []);


    return (
        <div className="content-videos home-videos">
            <div className="home-videos__container">
                <h2 className="">Пополярные видео</h2>

                <div className="home-videos__list ">
                    {videos.map(video => {
                        let title = video.snippet.title;

                        if (title.length > 50) {
                            title = title.substr(0, 50) + "..."
                        }

                        const views = video.statistics.viewCount;
                        const image = video.snippet.thumbnails.high.url;
                        const channelTitle = video.snippet.channelTitle;
                        const channelId = video.snippet.channelId;


                        return (
                            <VideoCard
                                className={"home-videos__item"}
                                key={video.id}
                                title={title}
                                views={`${views} просмотров`}
                                timestamp="3 дня назад"
                                channelId={channelId}
                                channel={channelTitle}
                                image={image}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomeVideos;