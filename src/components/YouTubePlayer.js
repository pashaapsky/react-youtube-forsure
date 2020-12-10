import React, {useState, useEffect} from 'react';
import YouTubePlayer from 'youtube-player';
import '../scss/youtube-player.scss'

function VideoPlayer({id}) {
    const [videoId, setVideoId] = useState('');
    const [player, setPlayer] = useState(null);

    // console.log('player :', player);


    useEffect(() => {
        setVideoId(id);

        if (id) {
            const player = YouTubePlayer(id, {
                videoId: id,
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 1,
                },
            });

            setPlayer(player);
        }
    }, [id]);

    return (
        <div className="watch-video__player youtube-player" >
            <div className="youtube-player__iframe" id={id}>

            </div>

            <div className="youtube-player__info">
                info
            </div>

            <div className="youtube-player__comments">
                qeqe
            </div>
        </div>
    );
}

export default VideoPlayer;