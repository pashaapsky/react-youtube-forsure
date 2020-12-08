import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import VideoCard from "./VideoCard";
import PetsIcon from '@material-ui/icons/Pets';
import axios from '../configs/youtube';
import '../scss/trending-videos.scss'

function TrendingVideos({categoryName, categoryId}) {
    const [videos, setVideos] = useState([]);

    const getVideosByCategoryId = useCallback(
        async (categoryId = '', maxResults = 12) => {

            const params = {
                part: "statistics,snippet,player,status",
                chart: "mostPopular",
                maxResults: maxResults,
                regionCode: 'US'
            };

            // если фильтруем по категории
            if (categoryId) {
                params.videoCategoryId = categoryId
            }

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
        // getVideosByCategoryId(categoryId)
    }, [getVideosByCategoryId, categoryId]);

    console.log('videos', videos);

    return (
        <div className="content-videos trend-videos">
            <div className="trend-videos__container">
                <h2 className={`trend-videos__header ${categoryName ? "" : "visually-hidden"}`}>
                    {categoryName ? categoryName : "Пополярные видео"}
                </h2>

                {!categoryName && <div className="trend-videos__nav">
                    <NavLink className="trend-videos__link" to="/trending/music">
                        <img
                            className="trend-videos__category-logo"
                            src="http://youtube.com/img/trending/chips/music_80x80.png"
                            alt="category-logo"
                        />

                        <span className="trend-videos__category-title">Музыка</span>
                    </NavLink>

                    <NavLink className="trend-videos__link" to="/trending/games">
                        <img
                            className="trend-videos__category-logo"
                            src="http://youtube.com/img/trending/chips/gaming_80x80.png"
                            alt="category-logo"
                        />

                        <span className="trend-videos__category-title">Видео игры</span>
                    </NavLink>

                    <NavLink className="trend-videos__link" to="/trending/animals">
                        <PetsIcon className="trend-videos__category-logo"/>

                        <span className="trend-videos__category-title">Животные</span>
                    </NavLink>

                    <NavLink className="trend-videos__link" to="/trending/films">
                        <img
                            className="trend-videos__category-logo"
                            src="//youtube.com/img/trending/chips/movies_80x80.png"
                            alt="category-logo"
                        />

                        <span className="trend-videos__category-title">Фильмы</span>
                    </NavLink>
                </div>}

                <div className="trend-videos__list videos-list">
                    {videos.map(video => {
                        const title = video.snippet.title;
                        const views = video.statistics.viewCount;
                        const image = video.snippet.thumbnails.medium.url;
                        const channelTitle = video.snippet.channelTitle;
                        const channelId = video.snippet.channelId;
                        const description = video.snippet.description;

                        return (
                            <VideoCard
                                className={"trend-videos__item"}
                                key={video.id}
                                title={title}
                                views={`${views} просмотров`}
                                timestamp="3 дня назад"
                                channelId={channelId}
                                channel={channelTitle}
                                image={image}
                                description={description}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TrendingVideos;