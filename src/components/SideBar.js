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
import {NavLink} from "react-router-dom";

function SideBar(props) {
    return (
        <aside className="sidebar">
            <ul className="sidebar__menu">
                <NavLink exact to="/">
                    <SideBarItem title="Главная" Icon={HomeIcon}/>
                </NavLink>

                <NavLink to="/trending">
                    <SideBarItem title="В тренде" Icon={WhatshotIcon}/>
                </NavLink>

                <NavLink to="/subscribes">
                    <SideBarItem title="Подписки" Icon={SubscriptionsIcon}/>
                </NavLink>

                <NavLink to="/library">
                    <SideBarItem title="Библиотека" Icon={VideoLibraryIcon}/>
                </NavLink>
            </ul>
        </aside>
    );
}

export default SideBar;