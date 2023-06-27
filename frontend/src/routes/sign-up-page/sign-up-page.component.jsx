import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/reducers/user/user.selector';
import { signUpStart } from '../../store/reducers/user/user.action';

import json2mq from "json2mq";

import {
    Typography,
    Button,
    TextField,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { FcGoogle } from 'react-icons/fc';

const initialSignUpState = {
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);

    const [formFields, setFormFields] = useState(initialSignUpState);
    
    const theme = useTheme();
    
    const smallDevice = useMediaQuery(
        json2mq({
            maxWidth: 800
        })
    )

    useEffect(() => {
      if (currentUser) {
        navigate('/summary')
      }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = formFields;
        if (password !== confirmPassword) {
            alert('Passwords must match');
            return;
        }
        try {
            dispatch(signUpStart(email, password));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            position: 'relative',
        }}>
            <Box sx={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                display: smallDevice ? 'none' : 'block'
            }}>
                <Typography variant='h4' fontWeight={700}>Logo</Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: '10vh',
                position: 'absolute',
                top: 0,
                opacity: 1,
                background: theme.palette.primary.main,
                borderBottomLeftRadius: '30px',
                display: smallDevice ? 'block' : 'none',
            }}>
                {/* Add logo here */}
            </Box>
            <Box sx={{
                padding: '3rem 5rem',
                flex: '1'
            }}>
                <Box>
                    <Typography
                        variant='h3'
                        mt={10}
                        fontWeight="bold"
                    >Sign Up
                    </Typography>
                    <Typography
                        variant='body2'
                        mt={4}
                    >Start using Legalyzer for free today.
                    </Typography>
                </Box>
                <Box sx={{
                    marginTop: '2rem',
                    width: '100%'
                }}>
                    <form onSubmit={handleSignUp}>
                        <TextField
                            type="email"
                            label="Email"
                            required
                            name="email"
                            onChange={handleChange}
                            value={formFields.email}
                            sx={{
                                width: '100%',
                                marginTop: '1.5rem',
                            }}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            required
                            name="password"
                            onChange={handleChange}
                            value={formFields.password}
                            sx={{
                                width: '100%',
                                marginTop: '1.5rem'
                            }}
                        />
                        <TextField
                            type="password"
                            label="Confirm Password"
                            required
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formFields.confirmPassword}
                            sx={{
                                width: '100%',
                                marginTop: '1.5rem'
                            }}
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{
                                marginTop: '2rem',
                                width: '100%',
                                padding: '0.5rem 2rem',
                                borderRadius: '5px',
                                color: 'white',
                                background: 'black'
                            }}
                        >
                            Get Started
                        </Button>
                        <a href='http://localhost:8000/v1/auth/google/web'>
                            <Button
                            variant='outlined'
                            type='button'
                            sx={{
                                width: '100%',
                                marginTop: '1.5rem',
                                padding: '0.5rem 2rem',
                                borderRadius: '5px',
                                border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
                                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                            }}
                            >
                                <FcGoogle fontSize={25} style={{ marginRight: '0.75rem' }} />
                                Sign Up With Google
                            </Button>
                        </a>
                    </form>
                </Box>
                <Box sx={{
                    marginTop: '0.75rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Typography variant='body1'>
                        Already have an account?&nbsp;  
                        <Link to='/auth/sign-in'>
                            <strong style={{
                                color: theme.palette.primary.main,
                                textDecoration: 'underline',
                                ':hover': {
                                    cursor: 'pointer'
                                }
                            }}>Sign In</strong>
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                flex: 2,
                background: theme.palette.primary.main,
                color: 'white',
                borderTopLeftRadius: '45px',
                borderBottomLeftRadius: '45px',
                display: smallDevice ? 'none' : 'block'
            }}>
                {/* Add logo here */}
            </Box>
        </Box>
    )
}

export default SignUpPage;
