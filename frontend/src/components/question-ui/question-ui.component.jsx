import React, { useRef, useEffect, useState } from "react";

import { Box, IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import { selectQuestions, selectQuestionsIsLoading } from '../../store/reducers/question/question.selector';

import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import Question from "../question/question.component";
import { askQuestionStart } from "../../store/reducers/question/question.action";
import QuestionSkeleton from "../question/question-skeleton.component";

const QuestionUI = ({ documentId }) => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const questions = useSelector(selectQuestions);

    const numQuestions = questions.length;

    const isLoading = useSelector(selectQuestionsIsLoading);

    const [questionText, setQuestionText] = useState('');

    const [submittedQuestion, setSubmittedQuestion] = useState('');

    const [isAtBottom, setIsAtBottom] = useState(false);

    const containerRef = useRef(null);

    console.log(containerRef.current)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
        }
    }, [numQuestions, isLoading]);
    
    useEffect(() => {
        if (!isLoading) {
            setSubmittedQuestion('');
        }
    }, [numQuestions, isLoading]);
    
    console.log(isAtBottom);
    
    // const handleScroll = () => {
    //     if (containerRef.current.scrollHeight - containerRef.current.scrollTop !== containerRef.current.clientHeight) {
    //         setIsAtBottom(false);
    //     } else {
    //         setIsAtBottom(true);
    //     }
    // }
    
    const handleChange = (e) => {
        setQuestionText(e.target.value);
    }

    const handleAsk = (e) => {
        e.preventDefault();
        dispatch(askQuestionStart(questions, documentId, questionText));
        setSubmittedQuestion(questionText);
        setQuestionText('');
    }

    const scrollToBottom = () => {
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    return (
            <Box sx={{
                flex: 4,
                position: 'relative',
                // padding: '1rem'
            }}>
                <Box ref={containerRef} sx={{
                    width: '100%',
                    height: '85%',
                    padding: '1rem',
                    overflowY: 'scroll',
                    position: 'relative'
                }}>
                    {/* <Clauses summary={summary} qAndA /> */}
                    {
                        questions.map((question, i) => (
                            <React.Fragment key={i}>
                                <Question text={question.question} />
                                <Question text={question.answer} answer createdAt={question.createdAt} />
                            </React.Fragment>
                        ))
                    }
                    {
                        (isLoading) && (
                            <React.Fragment>
                                <Question text={submittedQuestion} />
                                <QuestionSkeleton />
                            </React.Fragment>
                        )
                    }
                    {/* {
                        !isAtBottom && (
                            <IconButton 
                            onClick={scrollToBottom}
                            sx={{
                                position: 'fixed',
                                bottom: '20%',
                                right: '5%',
                                zIndex: 9999,
                            }}>
                                <ExpandCircleDownIcon style={{
                                    width: '45px',
                                    height: '45px'
                                }} />
                            </IconButton>
                        )
                    } */}
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '15%',
                        paddingX: '1rem',
                        background: theme.palette.mode === 'dark' ? grey[900] : grey[200],
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px'
                    }}>
                    <form
                        style={{
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onSubmit={handleAsk}
                    >
                        <TextField
                            placeholder="Ask Legalyzer"
                            sx={{ width: '95%' }}
                            value={questionText}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton type='submit'>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                </Box>
            </Box>
    )
}

export default QuestionUI;