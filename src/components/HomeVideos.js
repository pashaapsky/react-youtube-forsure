import React, {useEffect, useState} from 'react';
import axios from "../configs/youtube";
import RowsVideosTemplate from "./RowsVideosTemplate";
import {loadImagesOnScrollEnd} from '../helpers/loadImagesOnScrollEnd'

import "../scss/home-videos.scss"

function HomeVideos(props) {
    const [videos, setVideos] = useState([]);
    const [pageToken, setPageToken] = useState('');

    // load videos
    useEffect(() => {
        const getVideos = async (maxResults = 24) => {
                try {
                    const params = {
                        part: "statistics,snippet,player,status",
                        chart: "mostPopular",
                        maxResults: maxResults,
                        regionCode: 'RU'
                    };

                    const response = await axios.get('/videos', {params});

                    if (response) {
                        setPageToken(response.data.nextPageToken);
                        setVideos(response.data.items);
                    }
                } catch (e) {
                    console.error(e.message)
                }
            };

        getVideos();
    }, []);


    // загрузка видео при скролле до конца
    useEffect(() => {
        const getNextPageVideos = async (maxResults = 24) => {
            try {
                const params = {
                    part: "statistics,snippet,player,status",
                    chart: "mostPopular",
                    maxResults: maxResults,
                    regionCode: 'RU',
                    pageToken: pageToken
                };

                const response = await axios.get('/videos', {params});

                if (response) {
                    setPageToken(response.data.nextPageToken);
                    setVideos([...videos, ...response.data.items]);
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        loadImagesOnScrollEnd('.home-videos__item', getNextPageVideos);
    }, [pageToken, videos]);


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