import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/API.jsx'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import Cookies from 'js-cookie';

//login handle
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            //store token
            // if (data.success) {
            //     localStorage.setItem('authtoken', data.authtoken);
            // Cookies.set('authtoken', data.authtoken, { secure: true, sameSite: 'strict' })
            //     toast.success(data.message);
            //     window.location.replace('/');
            // }
            if (data.success) {
                localStorage.setItem('authtoken', data.authtoken);
                Cookies.set('authtoken', data.authtoken, {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1, // Set the cookie expiration time (in days)
                });
                toast.success(data.message);
                window.location.replace('/');
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                // return rejectWithValue(error.response.data.message)
                return toast.error(error.response.data.message);
            } else {
                // return rejectWithValue(error.message);
                return toast.error(error.message);
            }
        }
    }
)

//register handle
export const userRegister = createAsyncThunk(
    'auth/register',
    async ({ name, role, email, password, organisationName, hospitalName, website, address, phone, verified }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/', { name, role, email, password, organisationName, hospitalName, website, address, phone, verified });
            if (data.success) {
                toast.success(data.message);
                window.location.replace('/verify-email');
            }
            // if (data.success) {
            //     toast.success(data.message);
            //     window.location.replace('/login');
            // }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                // return rejectWithValue(error.response.data.message);
                return toast.error(error.response.data.message);
            } else {
                // return rejectWithValue(error.message)
                return toast.error(error.message);
            }
        }
    }
);

// verify user
// export const verifyUser = createAsyncThunk(
//     'auth/verify-email',
//     async ({ email }, { rejectWithValue }) => {
//         try {
//             const { data } = await API.get('/verify/:id/:token', {email});
//             if (data.success) {
//                 toast.success(data.message);
//                 window.location.replace('/login');
//             }
//             return data;
//         } catch (error) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )

//current user
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({ rejectWithValue }) => {
        try {
            const res = await API.get('/auth/current-user');
            if (res?.data) {
                return res?.data;
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);