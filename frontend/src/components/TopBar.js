import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const TopBar = (props) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const menuArea = useRef(null);



    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { username, isLoggedIn, displayName, image } = useSelector((store) => ({
        //redux'taki state bilgisini TopBar componentine property olarak alacağımız bir fonksiyon yazıyoruz
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn]);

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

    let links = (
        <ul className="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to="/login">
                    {t('Login')}
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    {t('Sign Up')}
                </Link>
            </li>
        </ul>
    );

    if (isLoggedIn) {

        let dropDownClass = 'dropdown-menu p-0 shadow';
        if (menuVisible) {
            dropDownClass += ' show';
        }

        links = (
            <ul className="navbar-nav ml-auto" ref={menuArea}>
                <li className="nav-item dropdown">
                    <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-auto" />
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>
                    <div className={dropDownClass}>
                        <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)} >
                            <i className="material-icons text-info mr-2" >person</i>
                            {t('My Profile')}
                        </Link>
                        <span className="dropdown-item d-flex p-2" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                            <i className="material-icons text-danger mr-2" >power_settings_new</i>
                            {t('Logout')}
                        </span>
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <div className="shadow-sm  bg-light mb-2">
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60" alt="Hoaxify Logo" ></img>Hoaxify
                </Link>
                {links}
            </nav>
        </div>
    );
}

export default TopBar;