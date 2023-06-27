import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress
      color='primary'
      size={50}
       />
    </Box>
  )
}

export default LoadingSpinner
