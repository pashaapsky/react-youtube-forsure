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
import "../scss/header.scss"
import {AuthContext} from "../context/AuthContext";

function Header() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const [inputSearch, setInputSearch] = useState('');

    return (
        <header className="header">
            <div className="header__heading">
                <button className="header__dropdown">
                    <MenuIcon component="svg"/>
                </button>

                <NavLink className="header__link" to="/" >
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
                <button className="action-btn">
                    <VideoCallIcon color="inherit" component="svg"/>
                </button>

                <button className="action-btn">
                    <AppsIcon className="action-item" component="svg" />
                </button>

                <button className="action-btn">
                    <NotificationsIcon className="action-item" component="svg" />
                </button>

                {isAuthenticated ? (
                    <Fragment>
                        <Avatar
                            className="action-item"
                            component="div"
                            alt="Remy Sharp"
                            src="https://www.flaticon.com/svg/static/icons/svg/145/145843.svg"
                        />

                        <div className="user-actions">
                            <button className="logout-btn" onClick={logout}>Logout</button>
                        </div>
                    </Fragment>

                ) : (
                    <NavLink className="login-link" to="/login">
                        <AccountCircleIcon className="login-link__icon"/>
                        Войти
                    </NavLink>
                )}

            </div>
        </header>
    );
}

export default Header;