import { Box, List, ListItemButton, useTheme } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ContactSupport from '@mui/icons-material/ContactSupport';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/reducers/user/user.action';

const SidebarBottomBar = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signOutStart());
    }

    return (
        <Box sx={{
            zIndex: 15,
            opacity: 1,
            flex: 1,
            width: '90%',
            margin: '0.5rem auto',
            padding: '1rem',
            borderRadius: '20px',
            border: `1px dashed ${theme.palette.mode === 'dark' ? 'white' : 'black'}`
    }}>
            <List>
                <ListItemButton>
                    <SettingsSuggestIcon style={{ marginRight: '0.25rem '}} />
                    Quickstart Guide
                </ListItemButton>
                <ListItemButton>
                    <ContactSupport style={{ marginRight: '0.25rem '}} />
                    FAQ & Feedback
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: '0.25rem '}} />
                    Log Out
                </ListItemButton>
            </List>
        </Box>
    )
}

export default SidebarBottomBar