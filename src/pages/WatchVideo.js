import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import axios from "../configs/youtube";
import RowsVideosTemplate from "../components/RowsVideosTemplate";
import YouTube from 'react-youtube'
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
        },
    };

    const getVideo = useCallback(async () => {
        const video = await axios.get('/videos', {
            params: {
                part: "statistics,snippet,status",
                id: watchVideoId
            }
        })
            .then(res => res.data.item[0])
        ;

        console.log('video!!', video);

        setPlayingVideo(video);

    }, [watchVideoId]);

    const getSimilarVideos = useCallback(
        async (maxResults = 24) => {
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
        }, [watchVideoId]
    );

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const videoId = params.get('v');

        // if (videoId) {
        setWatchVideoId(videoId);

        if (watchVideoId) {
            getSimilarVideos();
            getVideo();
        }
        // }
    }, [location, getSimilarVideos, getVideo, watchVideoId]);

    console.log('videos', similarVideos);
    console.log('video', playingVideo);

    return (
        <Fragment>
            <Header/>

            <div className="content">
                <SideBar />

                <div className="content-videos watch-video">
                    <div className="watch-video__player youtube-player">
                        <YouTube videoId={watchVideoId} opts={opts} containerClassName={'youtube-player__iframe'}/>

                        <div className="youtube-player__info">
                            info
                        </div>

                        <div className="youtube-player__comments">
                            qeqe
                        </div>
                    </div>

                    <div className="watch-video__similar videos-list">
                        <h4 className="watch-video__next-video">
                            Следующее
                        </h4>

                        <RowsVideosTemplate videos={similarVideos} className="watch-video__item" isWatchCard={true}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default WatchVideo;