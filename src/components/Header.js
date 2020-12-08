import React, {Fragment, useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import youtubeLogo from '../img/youtube-logo.png'
import {AuthContext} from "../context/AuthContext";
import UserActions from "./UserActions";
import "../scss/header.scss"

function Header() {
    const {isAuthenticated, user} = useContext(AuthContext);
    const [inputSearch, setInputSearch] = useState('');

    const openSideBarFullMenu = () => {
        const sidebar = document.querySelector('.sidebar');
        const sidebarFull = document.querySelector('.sidebar-full');
        const contentVideos = document.querySelector('.content-videos');

        sidebar.classList.toggle('show');
        sidebarFull.classList.toggle('show');

        const sidebarFullWidth = document.querySelector('.sidebar-full').offsetWidth;

        if (sidebarFullWidth !== 0) {
            contentVideos.style.marginLeft = `${sidebarFullWidth}px`;
        } else {
            contentVideos.style.marginLeft = `${sidebar.offsetWidth}px`;
        }
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
                        Войти
                    </NavLink>
                )}

                {isAuthenticated && <UserActions />}
            </div>
        </header>
    );
}

export default Header;