import { useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { grey } from '@mui/material/colors';

export const useQuestionBackground = (answer) => {
  const [color, setColor] = useState("");

  const theme = useTheme();

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
        if (answer) {
            setColor(theme.palette.primary.light);
        } else {
            setColor(theme.palette.primary.dark)
        }
    } else {
        if (answer) {
            setColor(grey[50]);
        } else {
            setColor(grey[300]);
        }
    }
  }, [theme, answer]);

  return color;
  
}

export default useQuestionBackground