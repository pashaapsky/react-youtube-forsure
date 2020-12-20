import React, {Fragment, useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import SideBarItem from "./SideBarItem";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import '../scss/sidebar.scss'

function SideBar({hide}) {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <aside className={`sidebar ${hide ? "visually-hidden" : ""}`}>
            <div className="sidebar-full__spacer"/>

            <ul className="sidebar__menu">
                <NavLink exact to="/" title="Главная">
                    <SideBarItem className="sidebar__item" title="Главная" Icon={HomeIcon}/>
                </NavLink>

                <NavLink to="/trending" title="В тренде">
                    <SideBarItem className="sidebar__item" title="В тренде" Icon={WhatshotIcon}/>
                </NavLink>

                {isAuthenticated && <Fragment>
                    <NavLink to="/subscriptions" title="Подписки">
                        <SideBarItem className="sidebar__item" title="Подписки" Icon={SubscriptionsIcon}/>
                    </NavLink>

                    <button title="Библиотека">
                        <SideBarItem className="sidebar__item" title="Библиотека" Icon={VideoLibraryIcon}/>
                    </button>
                </Fragment>}
            </ul>
        </aside>
    );
}

export default SideBar;