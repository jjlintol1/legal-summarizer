import { Box, useMediaQuery } from '@mui/material';
import Sidebar from '../../components/sidebar/sidebar.component';
import QuestionUI from '../../components/question-ui/question-ui.component';
import Navbar from '../../components/navbar/navbar.component';

import json2mq from 'json2mq';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/reducers/user/user.selector';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectActiveDocument } from '../../store/reducers/question/question.selector';

const ChatPage = () => {
    const showSidebar = useMediaQuery(
        json2mq({
            minWidth: 800
        })
    )

    const { documentId } = useParams();

    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!currentUser) {
            navigate('/auth/sign-in');
        }
    }, [currentUser, navigate]);

    const activeDocument = useSelector(selectActiveDocument);

    const navbarHeader = activeDocument ? `${activeDocument.companyName} ${activeDocument.documentType}` : ""
  
    
    return (
        <Box sx={{
            height: '100vh',
        }}>
            <Navbar header={navbarHeader} />
            <Box display="flex" sx={{
                height: '90%'
            }}>
                {/* <Navbar /> */}
                {showSidebar && <Sidebar desktop />}
                <QuestionUI documentId={documentId} />
            </Box>
        </Box>
    )
}

export default ChatPage;