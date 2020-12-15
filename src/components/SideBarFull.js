import React, {useContext, Fragment, useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import SideBarItem from "./SideBarItem";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TheatersIcon from '@material-ui/icons/Theaters';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CastIcon from '@material-ui/icons/Cast';
import SettingsIcon from '@material-ui/icons/Settings';
import FlagIcon from '@material-ui/icons/Flag';
import HelpIcon from '@material-ui/icons/Help';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Avatar} from "@material-ui/core";
import {DataContext} from "../context/DataContext";

import '../scss/sidebar-full.scss'


function SideBarFull() {
    const [subsToShow, setSubsToShow] = useState([]);
    const [showSubs, setShowSubs] = useState(false);

    const {isAuthenticated} = useContext(AuthContext);
    const {subscribtions} = useContext(DataContext);

    function declOfNum(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    useEffect(() => {
        if (subscribtions) {
            let subs = subscribtions.slice(0);

            if (subscribtions.length > 7 && !showSubs) {
                setSubsToShow(subs.splice(0, 7));
            } else {
                setSubsToShow(subscribtions);
            }
        }
    }, [subscribtions, showSubs]);

    return (
        <aside className="sidebar-full">
            <div className="sidebar-full__spacer"/>

            <ul className="sidebar-full__menu">
                <div className="sidebar-full__divider">
                    <NavLink exact to="/" title="Главная">
                        <SideBarItem className="sidebar-full__item" title="Главная" Icon={HomeIcon}/>
                    </NavLink>

                    <NavLink to="/trending" title="В тренде">
                        <SideBarItem className="sidebar-full__item" title="В тренде" Icon={WhatshotIcon}/>
                    </NavLink>

                    <NavLink to="/subscribtions" title="Подписки">
                        <SideBarItem className="sidebar-full__item" title="Подписки" Icon={SubscriptionsIcon}/>
                    </NavLink>
                </div>

                <div className="sidebar-full__divider">
                    <NavLink to="/library" title="Библиотека">
                        <SideBarItem className="sidebar-full__item" title="Библиотека" Icon={VideoLibraryIcon}/>
                    </NavLink>

                    <NavLink to="/history" title="История">
                        <SideBarItem className="sidebar-full__item" title="История" Icon={HistoryIcon}/>
                    </NavLink>

                    {isAuthenticated ?? <Fragment>
                        <NavLink className="no-active" to="" title="Ваши видео">
                            <SideBarItem className="sidebar-full__item" title="Ваши видео" Icon={PlayArrowIcon}/>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Смотреть позже">
                            <SideBarItem className="sidebar-full__item" title="Смотреть позже"
                                         Icon={WatchLaterIcon}/>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Понравившиеся">
                            <SideBarItem className="sidebar-full__item" title="Понравившиеся"
                                         Icon={ThumbUpAltIcon}/>
                        </NavLink>
                    </Fragment>}

                </div>

                {!isAuthenticated ? (
                    <div className="sidebar-full__divider sidebar-login">
                        <p className="sidebar-full__paragraph">Вы сможите ставить отметки "Нравиться", писать
                            комментарии и подписываться на каналы</p>

                        <NavLink className="login-link" to="/login">
                            <AccountCircleIcon className="login-link__icon"/>
                            Войти
                        </NavLink>
                    </div>
                ) : (
                    <div className="sidebar-full__divider">
                        <h3 className="sidebar-full__header">Подписки</h3>

                        {subsToShow && <Fragment>
                            {subsToShow.map(item => (
                                <a
                                    key={item.id}
                                    className="no-active"
                                    href={`https://www.youtube.com/channel/${item.snippet.resourceId.channelId}`}
                                    title={item.snippet.title}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <li className="sidebar-full__item sidebar-item">
                                        <Avatar className="sidebar-full__avatar"
                                                src={item.snippet.thumbnails.default.url}/>
                                        {item.snippet.title.length > 17 ? item.snippet.title.substr(0, 17) + '...' : item.snippet.title}
                                    </li>
                                </a>
                            ))}

                            {subscribtions.length > 7 && showSubs ? (
                                <Fragment>
                                    <NavLink
                                        className="no-active"
                                        to=""
                                        title={`Показать еще ${subscribtions.length - 7} каналов`}
                                        onClick={() => setShowSubs(false)}
                                    >
                                        <li className="sidebar-full__item sidebar-item">
                                            <ExpandLessIcon/>
                                            Свернуть
                                        </li>
                                    </NavLink>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <NavLink
                                        className="no-active"
                                        to=""
                                        title={`Показать еще ${subscribtions.length - 7} каналов`}
                                        onClick={() => setShowSubs(true)}
                                    >
                                        <li className="sidebar-full__item sidebar-item">
                                            <ExpandMoreIcon/>
                                            {`Показать еще ${subscribtions.length - 7} ${declOfNum(subscribtions.length - 7, ['канал', 'канала', 'каналов'])}`}
                                        </li>
                                    </NavLink>
                                </Fragment>
                            )}
                        </Fragment>}
                    </div>
                )}

                {!isAuthenticated && <Fragment>
                    <div className="sidebar-full__divider">
                        <h3 className="sidebar-full__header">Лучшее на Youtube</h3>

                        <NavLink className="no-active" to="" title="Музыка">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/ybjKz12P4DVvGPo8UKOrye-_cMyWmdFRAKc7ukIbaf_gQKceOYYJLZTPT1TICV_gHmu1ngMBrw=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Музыка"
                                />
                                Музыка
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Спорт">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/0tTwEpLNMWBtJWiRaRRh-tXpihyWdr-TtjdEdQUtYGL8SLeBYiD-JuwvLFchV5ttidSPBtww=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Спорт"
                                />
                                Спорт
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Видеоигры">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/7u9X7XRHmmTMTT0E1ppZQicqoD5YGAb2PhGQ6mabsDSUDeD3bdcmF8vBH_PlFOXJxARDPe-MUg=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Видеоигры"
                                />
                                Видеоигры
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Фильмы">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/6lo97rUTO7xhIBXZqLiaW2kA_eMBIEmqc27EqlKLyE4nAY-yzcKBG0Hs0YdUka3gJ629HcwgyzQ=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Фильмы"
                                />
                                Фильмы
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Новости">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/6lo97rUTO7xhIBXZqLiaW2kA_eMBIEmqc27EqlKLyE4nAY-yzcKBG0Hs0YdUka3gJ629HcwgyzQ=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Новости"
                                />
                                Новости
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Трансляции">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/8D6JlsnvwDZFMdcbjqVji82kggP3aXXbO-yBD0RFrKlp4G1zNt9wcqcVTSPnAI8GuUAbDYQwsg=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Трансляции"
                                />
                                Трансляции
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="В центре внимания">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/ytc/AAUvwnjnJFVUSkobVBQNH3MQWS6Rf3sOOZgHpl-pGRCX4w=s88-c-k-c0x00ffffff-no-rj"
                                    alt="В центре внимания"
                                />
                                В центре внимания
                            </li>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Панорамные видео">
                            <li className="sidebar-full__item sidebar-item">
                                <img
                                    className="sidebar-item__img"
                                    src="https://yt3.ggpht.com/QOLNKMxDmVthjq1PP1WAK1aAyjI3rXAY-GuE6cRAnL2RhRo9ZAPZBFKUvAf6DvzulgCu_CDk=s88-c-k-c0x00ffffff-no-rj"
                                    alt="Музыка"
                                />
                                Панорамные видео
                            </li>
                        </NavLink>
                    </div>

                    <div className="sidebar-full__divider">
                        <NavLink className="no-active" to="" title="Каталог товаров">
                            <SideBarItem className="sidebar-full__item" title="Каталог товаров"
                                         Icon={AddCircleIcon}/>
                        </NavLink>
                    </div>
                </Fragment>}


                <div className="sidebar-full__divider">
                    <h3 className="sidebar-full__header">Другие возможности</h3>

                    <NavLink className="no-active gray" to="" title="YouTube Premium">
                        <SideBarItem className="sidebar-full__item" title="YouTube Premium" Icon={YouTubeIcon}/>
                    </NavLink>

                    {isAuthenticated && <Fragment>
                        <NavLink className="no-active" to="" title="Фильмы">
                            <SideBarItem className="sidebar-full__item" title="Фильмы" Icon={TheatersIcon}/>
                        </NavLink>

                        <NavLink className="no-active" to="" title="Видеоигры">
                            <SideBarItem className="sidebar-full__item" title="Видеоигры" Icon={SportsEsportsIcon}/>
                        </NavLink>
                    </Fragment>}

                    <NavLink className="no-active" to="" title="Трансляции">
                        <SideBarItem className="sidebar-full__item" title="Трансляции" Icon={CastIcon}/>
                    </NavLink>
                </div>

                <div className="sidebar-full__divider">
                    <NavLink className="no-active" to="" title="Настройки">
                        <SideBarItem className="sidebar-full__item" title="Настройки" Icon={SettingsIcon}/>
                    </NavLink>

                    <NavLink className="no-active" to="" title="Жалобы">
                        <SideBarItem className="sidebar-full__item" title="Жалобы" Icon={FlagIcon}/>
                    </NavLink>

                    <NavLink className="no-active" to="" title="Справка">
                        <SideBarItem className="sidebar-full__item" title="Справка" Icon={HelpIcon}/>
                    </NavLink>

                    <NavLink className="no-active" to="" title="Отправить отзыв">
                        <SideBarItem className="sidebar-full__item" title="Отправить отзыв" Icon={RateReviewIcon}/>
                    </NavLink>
                </div>

                <p className="sidebar-full__author">
                    © 2020 pashaapsky
                </p>
            </ul>
        </aside>
    );
}

export default SideBarFull;