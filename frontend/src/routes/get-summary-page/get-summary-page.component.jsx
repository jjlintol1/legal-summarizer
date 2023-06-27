import MainForm from '../../components/main-form/main-form.component'
import { useMediaQuery, Box } from '@mui/material'
import json2mq from 'json2mq'
import Sidebar from '../../components/sidebar/sidebar.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/reducers/user/user.selector';
import { useEffect } from 'react';
import Navbar from '../../components/navbar/navbar.component';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { signInUserWithGoogle } from '../../utils/api/user.utils';
import { signInFailed, signInSuccess, signOutStart } from '../../store/reducers/user/user.action';
import { showExpirationAlert } from '../../store/reducers/alert/alert.action';

const GetSummaryPage = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useIsAuthenticated();

    const showSidebar = useMediaQuery(
        json2mq({
            minWidth: 800
        })
    )
    
    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const getGoogleAuthenticatedUser = async () => {
            try {
                if (!currentUser) {
                    const response = await signInUserWithGoogle();
                    if (!response.success || !response.user) {
                        console.log('No user');
                        console.log(response);
                        navigate('/auth/sign-in');
                    } else {
                        const user = response.user;
                        const sessionExpiration = setTimeout(() => {
                            dispatch(showExpirationAlert());
                            dispatch(signOutStart());
                        }, user.expiration - Date.now());
                        dispatch(signInSuccess(user, sessionExpiration))
                    }
                }        
            } catch (error) {
                console.log(error.toJSON());
                dispatch(signInFailed(error));
                navigate('/auth/sign-in');
            }
        }
        getGoogleAuthenticatedUser();
    }, [currentUser, navigate, dispatch]);
  
    return (
        <Box sx={{
            height: '100vh',
            padding: '1rem'
        }}>
            <Navbar header="New Summary" />
            <Box display="flex" sx={{
                height: '90%'
            }}>
                {/* <Navbar /> */}
                {showSidebar && <Sidebar desktop />}
                <MainForm />
            </Box>
        </Box>
  )
}

export default GetSummaryPage