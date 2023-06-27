import React from 'react';

import {
    Typography,
    Box,
    useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';

const Clauses = ({ summary, qAndA }) => {
    const theme = useTheme();

    const mode = theme.palette.mode;

  return (
    <Box sx={{
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography variant='h6'>Generated Main Points:</Typography>
        <Box sx={{
            borderRadius: '15px',
            background: mode === 'dark' ? grey[800] : grey[200],
            padding: '0.75rem',
            marginTop: '0.5rem'
        }}>
            {
                summary.map((clause, i) => (
                    <React.Fragment>
                        <Typography key={i} variant='body2' sx={{ marginBottom: '0.5rem' }}>&bull; {clause}</Typography>
                    </React.Fragment>
                ))
            }
        </Box>
    </Box>
  )
}

export default Clauses
