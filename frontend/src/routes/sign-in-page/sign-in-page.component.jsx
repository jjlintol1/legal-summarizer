import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { 
    Button, 
    Typography,
    TextField, 
    Checkbox,
    FormControlLabel,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

import json2mq from "json2mq";
import { emailSignInStart } from "../../store/reducers/user/user.action";
import { selectAuthError, selectCurrentUser } from "../../store/reducers/user/user.selector";
// import { getCompaniesStart } from "../../store/reducers/company/company.action";

const initialSignInState = {
    email: '',
    password: ''
}

const SignInPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);

    const authError = useSelector(selectAuthError);

    const [formFields, setFormFields] = useState(initialSignInState);

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

    useEffect(() => {
        if (authError) {
            alert(authError.message);
        }
    }, [authError]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = formFields;
        try {
            dispatch(emailSignInStart(email, password));
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            position: 'relative'
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
                display: smallDevice ? 'block' : 'none'
            }}>
                {/* Add logo here */}
            </Box>
            <Box sx={{
                padding: '3rem 5rem',
                flex: 1
            }}>
                <Box>
                    <Typography 
                    variant='h3'
                    mt={10}
                    fontWeight="bold"
                    >Welcome Back
                    </Typography>
                    <Typography 
                    variant='body2'
                    mt={4}
                    >Continue with Google or enter your information below.
                    </Typography>
                    <a href="http://localhost:8000/v1/auth/google/web">
                        <Button 
                            variant='outlined' 
                            type='button'
                            sx={{
                                width: '100%',
                                marginTop: '1.5rem',
                                padding: '0.5rem 2rem',
                                border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
                                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                borderRadius: '5px',
                            }}
                        >
                            <FcGoogle fontSize={25} style={{
                                marginRight: '0.75rem'
                            }} />
                            Sign In With Google
                        </Button>
                    </a>
                </Box>
                <Box sx={{
                    marginTop: '2rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{
                        height: '1px',
                        width: '42%',
                        backgroundColor: 'black',
                    }} />
                    <Typography>Or</Typography>
                    <div style={{
                        height: '1px',
                        width: '42%',
                        backgroundColor: 'black',
                    }} />
                </Box>
                <Box sx={{
                    marginTop: '2rem',
                    width: '100%'
                }}>
                    <form onSubmit={handleSignIn}>
                        <TextField 
                        type="email" 
                        label="Email"
                        required
                        name="email"
                        onChange={handleChange}
                        value={formFields.email}
                        sx={{
                            width: '100%',
                            marginTop: '1.5rem'
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
                        <Box sx={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Stay logged in" />
                            <Typography>Forgot password?</Typography>
                        </Box>
                        <Button 
                        variant='contained' 
                        type='submit'
                        sx={{
                            marginTop: '2rem',
                            width: '100%',
                            background: 'black',
                            padding: '0.5rem 2rem',
                            borderRadius: '5px',
                            color: 'white'
                        }}
                        >
                            Log In
                        </Button>
                    </form>
                </Box>
                <Box sx={{
                    marginTop: '0.75rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Typography variant='body1'>
                        Don't have an account?&nbsp;
                        <Link to='/auth'>
                            <strong style={{
                                color: theme.palette.primary.main,
                                textDecoration: 'underline',
                                ':hover': {
                                    cursor: 'pointer'
                                }
                            }}>Sign up for free</strong>
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

export default SignInPage
