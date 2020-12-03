import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import youtubeLogo from '../img/youtube-logo.png'
import "../scss/header.scss"

function Header(props) {
    const [inputSearch, setInputSearch] = useState('');

    return (
        <header className="header">
            <div className="header__heading">
                <button className="header__dropdown">
                    <MenuIcon component="svg"/>
                </button>

                <NavLink to="/" >
                    <img
                        className="header__logo"
                        src={youtubeLogo}
                        alt="youtube-logo"
                    />
                </NavLink>
            </div>

            <div className="header__search">
                <input
                    className="input-field"
                    type="text"
                    placeholder="Введите запрос"
                    value={inputSearch}
                    onChange={(event) => setInputSearch(event.target.value)}
                />

                <NavLink to={`/search/${inputSearch}`} className="btn search-btn">
                    <SearchIcon className="search-field" component="svg"/>
                </NavLink>
            </div>

            <div className="header__actions">
                <VideoCallIcon className="action-item" color="inherit" component="svg"/>

                <AppsIcon className="action-item" component="svg" />

                <NotificationsIcon className="action-item" component="svg" />

                <Avatar
                    className="action-item"
                    component="div"
                    alt="Remy Sharp"
                    src="https://www.flaticon.com/svg/static/icons/svg/145/145843.svg"
                />
            </div>
        </header>
    );
}

export default Header;