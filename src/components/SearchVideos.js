import React from 'react';
import VideoCard from "./VideoCard";
import TuneIcon from '@material-ui/icons/Tune';
import "../scss/search-videos.scss"
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";

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

            <ChannelRow
                image=""
                channel="Channel"
                verified
                subs="659k"
                noOfVideos={382}
                description="You can find videos here"
            />

            <VideoRow
                image=""
                title=""
                channel="Channel"
                verified
                subs="659k"
                timestamp
                description="You can find videos here"
            />

        </div>
    );
}

export default SearchVideos;