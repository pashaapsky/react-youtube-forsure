import React from 'react';
import TuneIcon from '@material-ui/icons/Tune';
import "../scss/search-videos.scss"

function SearchVideos(props) {
    return (
        <div className="search-videos">
            <h2 className="search-videos__header visually-hidden">Видео по запросу</h2>

            <div className="search-videos__filter">
                <button className="search-videos__filter-btn">
                    <TuneIcon />
                    <span>Фильтры</span>
                </button>
            </div>
        </div>
    );
}

export default SearchVideos;