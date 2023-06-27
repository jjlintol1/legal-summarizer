import { Avatar, Box, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'

const QuestionSkeleton = () => {
    

  return (
    <Box sx={{
        width: '100%',
        background: grey[50],
        padding: '1rem',
        borderBottom: '1px solid black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }}>
        <Avatar sx={{
            alignSelf: 'flex-start',
            marginX: '0.75rem'
        }}>A</Avatar>
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Skeleton variant="text" width={400} />
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Skeleton variant="text" width={400}/>
            </Box>
        </Box>
    </Box>
  )
}

export default QuestionSkeleton;