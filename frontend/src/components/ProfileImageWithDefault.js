import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefault = props => {

    const { className, username, image, width, height } = props;

    let imageSource = defaultPicture;
    if (image)
        imageSource = image;

    return (<img alt={`Profile`} src={imageSource} {...props}></img>);
};

export default ProfileImageWithDefault;