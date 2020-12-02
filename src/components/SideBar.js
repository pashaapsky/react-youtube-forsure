import React from 'react';
import SideBarItem from "./SideBarItem";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import '../scss/sidebar.scss'

function SideBar(props) {
    return (
        <aside className="sidebar">
            <ul className="sidebar__menu">
                <SideBarItem title="Главная" Icon={HomeIcon}/>
                <SideBarItem title="В тренде" Icon={WhatshotIcon}/>
                <SideBarItem title="Подписки" Icon={SubscriptionsIcon}/>
                <SideBarItem title="Библиотека" Icon={VideoLibraryIcon}/>
            </ul>
        </aside>
    );
}

export default SideBar;