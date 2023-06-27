import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  CssBaseline,
  Box,
  ThemeProvider
} from '@mui/material';
import AuthPage from "./routes/auth-page/auth-page.component";
import './App.scss';
import GetSummaryPage from "./routes/get-summary-page/get-summary-page.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTheme } from "./store/reducers/theme/theme.selector";

import { theme, lightTheme } from "./theme";
import ChatPage from "./routes/chat-page/chat-page.component";
import useIsAuthenticated from "./hooks/useIsAuthenticated";
import { selectExpirationAlert } from "./store/reducers/alert/alert.selector";
import LogoutDialog from "./components/logout-dialog/logout-dialog.component";
import { googleSignInStart } from "./store/reducers/user/user.action";


function App() {
  const isAuthenticated = useIsAuthenticated();

  const dispatch = useDispatch();

  const themeType = useSelector(selectCurrentTheme);

  const showExpirationAlert = useSelector(selectExpirationAlert);
  
  const currentTheme = themeType === 'dark' ? theme : lightTheme;

  
  

  return (
    <ThemeProvider theme={currentTheme}>
      <Box sx={{ background: currentTheme.palette.background.default }}>
        <CssBaseline />
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/summary/:companyParam?" element={<GetSummaryPage />} />
          <Route path="/ask/:documentId" element={<ChatPage />} />
        </Routes>
        <LogoutDialog open={showExpirationAlert} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
