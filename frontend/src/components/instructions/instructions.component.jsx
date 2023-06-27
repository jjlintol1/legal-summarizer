import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'

const Instructions = () => {
  return (
    <Box sx={{
        width: '100%',
        height: '100%',
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }}>
        <Typography variant='h3' align='center'>
            Legalyzer
        </Typography>
        <Card raised sx={{
            marginTop: '4rem',
            borderRadius: '10px',
            padding: '2rem'
        }}> 
            <Typography variant='h6' align='center' sx={{ mb: '0.5rem' }}>
                Enter an End User Agreement type, company/service and URL to view a brief and concise summary of the agreement.
            </Typography>
            <Typography variant='body2' align='center'>
                Disclaimer: The AI may occasionally generate misleading or incomplete information. It is still recommended to read the most important of the document to ensure full understanding.
            </Typography>
        </Card>
    </Box>
  )
}

export default Instructions
