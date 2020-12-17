import React, {Fragment, useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import youtubeLogo from '../img/youtube-logo.png'
import {AuthContext} from "../context/AuthContext";
import UserActions from "./UserActions";

import "../scss/header.scss"

function Header() {
    const {isAuthenticated, user} = useContext(AuthContext);
    const [inputSearch, setInputSearch] = useState('');

    const openSideBarFullMenu = () => {
        const sidebarFull = document.querySelector('.sidebar-full');
        const contentVideos = document.querySelector('.content-videos');

        sidebarFull.classList.toggle('show');

        if (window.innerWidth > 768) {
            contentVideos.classList.toggle('margined');
        }
    };


    const openSearch = () => {
        const headerSearchElem = document.querySelector('.header__search');
        const headerHeadingElem = document.querySelector('.header__heading');
        const headerActions = document.querySelector('.header__actions');
        const searchBackBtn = headerSearchElem.querySelector('.header__search-back');

        headerSearchElem.classList.toggle('show');
        headerHeadingElem.style.display = 'none';
        headerActions.style.display = 'none';
        searchBackBtn.style.display = 'block';
    };

    const closeSearch = () => {
        const headerSearchElem = document.querySelector('.header__search');
        const headerHeadingElem = document.querySelector('.header__heading');
        const headerActions = document.querySelector('.header__actions');
        const searchBackBtn = headerSearchElem.querySelector('.header__search-back');

        headerSearchElem.classList.toggle('show');
        headerHeadingElem.style.display = 'flex';
        headerActions.style.display = 'flex';
        searchBackBtn.style.display = 'none';
    };

    const showProfileActions = () => {
        const profileActions = document.querySelector('.user-actions');

        profileActions.classList.toggle('show');
    };


    return (
        <header className="header">
            <div className="header__heading">
                <button
                    className="header__dropdown"
                    onClick={openSideBarFullMenu}
                >
                    <MenuIcon component="svg"/>
                </button>

                <NavLink className="header__link" title="Главная страница YouTube" to="/">
                    <img
                        className="header__logo"
                        src={youtubeLogo}
                        alt="youtube-logo"
                    />
                </NavLink>
            </div>

            <div className="header__search">
                <div className="header__search-back">
                    <ArrowBackIcon onClick={closeSearch}/>
                </div>

                <input
                    className="input-field"
                    type="text"
                    placeholder="Введите запрос"
                    value={inputSearch}
                    onChange={(event) => setInputSearch(event.target.value)}
                />

                <NavLink to={`/search/${inputSearch}`} title="Введите запрос" className="btn search-btn">
                    <SearchIcon className="search-field" component="svg"/>
                </NavLink>
            </div>

            <div className="header__actions">
                <button className="action-btn search-btn" onClick={openSearch} title="Открыть меню поиска">
                    <SearchIcon className="search-field" component="svg"/>
                </button>

                <button className="action-btn" title="Создать">
                    <VideoCallIcon color="inherit" component="svg"/>
                </button>

                <button className="action-btn" title="Приложения YouTube">
                    <AppsIcon className="action-item" component="svg"/>
                </button>

                <button className="action-btn" title="Уведомления">
                    <NotificationsIcon className="action-item" component="svg"/>
                </button>

                {isAuthenticated ? (
                    <Fragment>
                        <button className="header__profile-btn" onClick={showProfileActions}>
                            <Avatar
                                className="action-item"
                                component="div"
                                alt="Remy Sharp"
                                src={user.providerData[0].photoURL}
                            />
                        </button>
                    </Fragment>

                ) : (
                    <NavLink className="login-link" to="/login">
                        <AccountCircleIcon className="login-link__icon"/>
                        <span>Войти</span>
                    </NavLink>
                )}

                {isAuthenticated && <UserActions/>}
            </div>
        </header>
    );
}

export default Header;