import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

const UserPage = () => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { username } = useParams();

    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);


    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username]);


    if (notFound) { // not found'a düşmemiz bir şeylerin tamamlandığını gösteriyor
        return (
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>error</i>
                    </div>
                    {t('User Not Found!')}
                </div>
            </div>
        )
    }

    if (pendingApiCall || user.username !== username) { // state'mizdeki user'ın username'i useParams()'tan beklediğimiz(url'den aldığımız username) 
        // username ile aynı değilse: henüz data'yı load etmediğimiz anlamına geliyor.
        return (<Spinner />);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <ProfileCard user={user} />
                </div>
                <div className="col">
                    <HoaxFeed />
                </div>

            </div>
        </div>
    );
};

export default UserPage;