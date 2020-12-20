import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import PetsIcon from '@material-ui/icons/Pets';
import axios from '../configs/youtube';
import RowsVideosTemplate from "./RowsVideosTemplate";
import '../scss/trending-videos.scss'
import {loadImagesOnScrollEnd} from "../helpers/loadImagesOnScrollEnd";

function TrendingVideos({categoryName, categoryId}) {
    const [videos, setVideos] = useState([]);
    const [pageToken, setPageToken] = useState('');


    // load videos
    useEffect(() => {
        const getVideosByCategoryId = async (categoryId = '', maxResults = 12) => {
            const params = {
                part: "statistics,snippet,player,status",
                chart: "mostPopular",
                maxResults: maxResults,
                regionCode: 'UA'
            };

            // если фильтруем по категории
            if (categoryId) {
                params.videoCategoryId = categoryId
            }

            const response = await axios.get('/videos', {params})
                .catch(e => {
                    console.error(e.message);
                })
            ;

            if (response) {
                setVideos(response.data.items);
            }
        };

        getVideosByCategoryId(categoryId)
    }, [categoryId]);

    // загрузка видео при скролле до конца
    const getNextPageVideos = useCallback(async (categoryId = '', maxResults = 24) => {
        try {
            const params = {
                part: "statistics,snippet,player,status",
                chart: "mostPopular",
                maxResults: maxResults,
                regionCode: 'UA',
                pageToken: pageToken
            };

            if (categoryId) {
                params.videoCategoryId = categoryId
            }

            const response = await axios.get('/videos', {params});

            if (response) {
                setPageToken(response.data.nextPageToken);
                setVideos([...videos, ...response.data.items]);
            }
        } catch (e) {
            console.error(e.message)
        }
    }, [pageToken, videos]);

    useEffect(() => {
        // loadImagesOnScrollEnd('.trend-videos__item', getNextPageVideos(categoryId));
    }, [getNextPageVideos, categoryId]);

    return (
        <div className="content-videos trend-videos">
            <div className="trend-videos__container fixed-container">
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
                    <RowsVideosTemplate videos={videos} className="trend-videos__item" showDescription={true} isTrendingCard={true}/>
                </div>
            </div>
        </div>
    );
}

export default TrendingVideos;