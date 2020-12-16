import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SideBarFull from "../components/SideBarFull";
import axios from "../configs/youtube";
import RowsVideosTemplate from "../components/RowsVideosTemplate";
import YouTube from 'react-youtube'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import '../scss/watch-video.scss'
import '../scss/youtube-player.scss'


function WatchVideo(props) {
    const [watchVideoId, setWatchVideoId] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [similarVideos, setSimilarVideos] = useState([]);

    const location = useLocation();

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            showinfo: 0,
            controls: 1
        },
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const videoId = params.get('v');

        const getVideo = async () => {
            const video = await axios.get('/videos', {
                    params: {
                        part: "statistics,snippet,status",
                        id: watchVideoId
                    }
                })
                    .then(res => res.data.items[0])
            ;


            if (video) {
                setPlayingVideo(video);
            }
        };

        const getSimilarVideos = async (maxResults = 24) => {
            try {
                let videosIds = '';

                // похожие видео id`s
                await axios.get('/search', {
                    params: {
                        part: "snippet",
                        maxResults: maxResults,
                        relatedToVideoId: watchVideoId,
                        type: 'video'
                    }
                })
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
                                part: "statistics,snippet,status",
                                id: videosIds.join(',')
                            }
                        })
                            .then(res => res.data.items)
                    ;

                    if (videos) {
                        setSimilarVideos(videos);
                    }
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        setWatchVideoId(videoId);

        if (watchVideoId) {
            getSimilarVideos();
            getVideo();
        }
    }, [location, watchVideoId]);


    // console.log('videos', similarVideos);
    console.log('video', playingVideo);

    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar hide={true}/>
                <SideBarFull/>

                {playingVideo && <div className="content-videos watch-video">
                    <div className="watch-video__player youtube-player">
                        <YouTube videoId={watchVideoId} opts={opts} containerClassName={'youtube-player__iframe'}/>

                        <div className="youtube-player__info">
                            {playingVideo.snippet.tags && (
                                <div className="youtube-player__tags">
                                    {playingVideo.snippet.tags.slice(0, 3).map(tag => (
                                        <a href="" className="youtube-player__tag-link">
                                            <span
                                                className="youtube-player__tag">#{tag.charAt(0).toUpperCase() + tag.slice(1)}&nbsp;</span>
                                        </a>
                                    ))}
                                </div>
                            )}

                            <h4 className="youtube-player__title">{playingVideo.snippet.title}</h4>

                            <div className="youtube-player__statistics">
                                <div className="youtube-player__statistics-left">
                                    <div className="youtube-player__views">
                                        {playingVideo.statistics.viewCount} просмотров &nbsp;•&nbsp;
                                    </div>

                                    <div className="youtube-player__date">
                                        {new Date(playingVideo.snippet.publishedAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="youtube-player__statistics-right">
                                    <div className="youtube-player__likes">
                                        <a href="#" title="Нравится">
                                            <ThumbUpIcon/>

                                            {playingVideo.statistics.likeCount}
                                        </a>
                                    </div>

                                    <div className="youtube-player__dislikes">
                                        <a href="#" title="Не нравится">
                                            <ThumbDownIcon/>
                                            {playingVideo.statistics.dislikeCount}
                                        </a>
                                    </div>

                                    <div className="youtube-player__send">
                                        <a href="#" title="Поделиться">
                                            <ReplyIcon/>
                                            Поделиться
                                        </a>
                                    </div>

                                    <div className="youtube-player__save">
                                        <a href="#" title="Сохранить">
                                            <PlaylistAddIcon/>
                                            Сохранить
                                        </a>
                                    </div>

                                    <div className="youtube-player__more-options">
                                        <a href="#">
                                            <MoreHorizIcon/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="watch-video__similar videos-list">
                        <h4 className="watch-video__next-video">
                            Следующее
                        </h4>

                        <RowsVideosTemplate videos={similarVideos} className="watch-video__item"
                                            isWatchCard={true}/>
                    </div>
                </div>}
            </div>
        </Fragment>
    );
}

export default WatchVideo;