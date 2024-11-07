import React, { useEffect, useState } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favourite-movies';
import UpdateUser from './update-user';

const UserProfile = ({ urlAPI, user, token, movies }) => {

    return (
        <>
            <UserInfo
                username={user.userName}
                email={user.email}
            />
            <FavoriteMovies
                urlAPI={urlAPI}
                user={user}
                token={token}
                movies={movies}
            />
            <UpdateUser
                urlAPI={urlAPI}
                user={user}
                token={token}
            />

        </>
    );
};

export default UserProfile;

