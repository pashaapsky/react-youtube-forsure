import React, {useContext} from 'react';
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SecurityIcon from '@material-ui/icons/Security';
import LanguageIcon from '@material-ui/icons/Language';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AuthContext} from "../context/AuthContext";
import "../scss/user-actions.scss"

function UserActions() {
    const {logout, user} = useContext(AuthContext);

    return (
        <div className="header__user-actions user-actions">
            <div className="user-actions__user-info">
                <Avatar
                    className="user-actions__user-logo"
                    src={user.providerData[0].photoURL}
                    alt={user.providerData[0].displayName}
                />

                <div className="user-actions__user-bio">
                    <h4 className="user-actions__fio">
                        {user.providerData[0].displayName}
                    </h4>

                    <span className="user-actions__email">
                        {user.providerData[0].email}
                    </span>

                    <NavLink className="user-actions__google-control no-active" to="">
                        Управление аккаунтом Google
                    </NavLink>
                </div>
            </div>

            <ul className="user-actions__list">
                <div className="user-actions__divider">
                    <NavLink className="user-actions__link no-active" to="" title="Мой канал">
                        <li className="user-actions__item">
                            <AccountBoxIcon className="user-actions__item-logo"/>
                            Мой канал
                        </li>
                    </NavLink>

                    <NavLink className="user-actions__link no-active" to=""
                             title="Покупки и платные подписки">
                        <li className="user-actions__item">
                            <MonetizationOnIcon className="user-actions__item-logo"/>
                            Покупки и платные подписки
                        </li>
                    </NavLink>

                    <NavLink className="user-actions__link no-active" to="" title="">
                        <li className="user-actions__item">
                            <SettingsApplicationsIcon className="user-actions__item-logo"/>
                            Творческая студия YouTube
                        </li>
                    </NavLink>

                    <button className="user-actions__link-btn" title="Выйти" onClick={logout}>
                        <li className="user-actions__item">
                            <AccountBoxIcon className="user-actions__item-logo"/>
                            Сменить аккаунт
                            <ArrowForwardIosIcon className="user-actions__arrow-forward"/>
                        </li>
                    </button>

                    <button className="user-actions__link-btn" title="Выйти" onClick={logout}>
                        <li className="user-actions__item">
                            <ExitToAppIcon className="user-actions__item-logo"/>
                            Выйти
                        </li>
                    </button>
                </div>

                <div className="user-actions__divider">
                    <button className="user-actions__link-btn" title="Тема">
                        <li className="user-actions__item">
                            <Brightness4Icon className="user-actions__item-logo"/>
                            Тема: тёмная
                            <ArrowForwardIosIcon className="user-actions__arrow-forward"/>
                        </li>
                    </button>

                    <button className="user-actions__link-btn" title="Язык">
                        <li className="user-actions__item">
                            <TranslateIcon className="user-actions__item-logo"/>
                            Язык: Русский
                            <ArrowForwardIosIcon className="user-actions__arrow-forward"/>
                        </li>
                    </button>

                    <button className="user-actions__link-btn" title="Страна">
                        <li className="user-actions__item">
                            <LanguageIcon className="user-actions__item-logo"/>
                            Страна: Россия
                            <ArrowForwardIosIcon className="user-actions__arrow-forward"/>
                        </li>
                    </button>

                    <NavLink className="user-actions__link no-active" to="" title="Настройки">
                        <li className="user-actions__item">
                            <SettingsIcon className="user-actions__item-logo"/>
                            Настройки
                        </li>
                    </NavLink>

                    <NavLink className="user-actions__link no-active" to="" title="Личные данные">
                        <li className="user-actions__item">
                            <SecurityIcon className="user-actions__item-logo"/>
                            Личные данные на YouTube
                        </li>
                    </NavLink>

                    <NavLink className="user-actions__link no-active" to="" title="Справка">
                        <li className="user-actions__item">
                            <HelpIcon className="user-actions__item-logo"/>
                            Справка
                        </li>
                    </NavLink>

                    <NavLink className="user-actions__link no-active" to="" title="Отправить отзыв">
                        <li className="user-actions__item">
                            <RateReviewIcon className="user-actions__item-logo"/>
                            Отправить отзыв
                        </li>
                    </NavLink>

                    <button className="user-actions__link-btn" title="Быстрые клавиши">
                        <li className="user-actions__item">
                            <KeyboardIcon className="user-actions__item-logo"/>
                            Быстрые клавиши
                        </li>
                    </button>
                </div>

                <div className="user-actions__divider">
                    <button className="user-actions__link-btn" title="Безопасный режим">
                        <li className="user-actions__item">
                            Безопасный режим: откл.
                            <ArrowForwardIosIcon className="user-actions__arrow-forward"/>
                        </li>
                    </button>
                </div>
            </ul>
        </div>
    );
}

export default UserActions;