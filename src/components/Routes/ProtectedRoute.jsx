import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../redux/features/authActions.jsx';
import API from '../../services/API.jsx';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    //get current user
    const getUser = async () => {
        try {
            const { data } = await API.get('/auth/current-user');
            if (data?.success) {
                dispatch(getCurrentUser(data));
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    })

    if (localStorage.getItem('authtoken')) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute
