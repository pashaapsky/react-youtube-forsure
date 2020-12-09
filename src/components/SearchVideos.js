import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TuneIcon from '@material-ui/icons/Tune';
import "../scss/search-videos.scss"
import RowsVideosTemplate from "./RowsVideosTemplate";
import axios from "../configs/youtube";

function SearchVideos(props) {
    const [videos, setVideos] = useState([]);
    const {searchTerm} = useParams();

    const getVideos = useCallback(
        async (maxResults = 24) => {
            try {
                let videosIds = [];

                const params = {
                    q: searchTerm,
                    part: "snippet",
                    maxResults: maxResults,
                };

                await axios.get('/search', {params})
                    .then(res => {
                        return res.data.items.map(video => (video.id.videoId))
                    })
                    .then(res => {
                        videosIds = [...res, ...videosIds]
                    })
                ;

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

                    if (videos) {
                        setVideos(videos);
                    }
                }
            } catch (e) {
                console.error(e.message)
            }
        }, [searchTerm]
    );

    useEffect(() => {
        if (searchTerm) {
            getVideos();
        }
    }, [searchTerm, getVideos]);

    console.log(videos);

    return (
        <div className="content-videos search-videos">
            <div className="search-videos__container">
                <h2 className="search-videos__header visually-hidden">Видео по запросу</h2>

                <div className="search-videos__filter videos-list">
                    <button className="search-videos__filter-btn">
                        <TuneIcon/>
                        <span>Фильтры</span>
                    </button>

                    <RowsVideosTemplate videos={videos} className="search-videos__item" isSearchCard={true} showDescription={true}/>
                </div>
            </div>
        </div>


    );
}

export default SearchVideos;