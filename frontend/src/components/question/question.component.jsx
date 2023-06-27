import { Avatar, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'

import TimeAgo from 'timeago-react';
import useQuestionBackground from '../../hooks/useQuestionBackground';

const Question = ({ text, answer, createdAt }) => {
    const color = useQuestionBackground(answer);

  return (
    <Box sx={{
        width: '100%',
        background: color,
        padding: '1rem',
        borderBottom: '1px solid black',
        display: 'flex',
        flexDirection: answer ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '15px',
        marginBottom: answer ? '1rem' : '0.25rem'
    }}>
        <Avatar sx={{
            alignSelf: 'flex-start',
            marginX: '0.75rem'
        }}>{answer ? 'A' : 'Q'}</Avatar>
        <Box>
            {
                answer ? text.map((line, i) => (
                <React.Fragment>
                    <Typography key={i} variant='body2'>{line}</Typography>
                    {text.length > 1 && <br />}
                </React.Fragment>
                ))
                : <Typography variant='body2'>{text}</Typography>
            }
            {
            answer ? (
                <TimeAgo datetime={new Date(createdAt)} style={{
                    fontSize: '0.8rem'
                }} />) : null}
        </Box>
    </Box>
  )
}

export default Question;