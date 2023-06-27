import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'radial-gradient(107.85% 120.41% at 54.82% 52.19%, #000000 0%, #1D1D1D 37.36%, #30363A 64.42%)',
            paper: 'radial-gradient(107.85% 120.41% at 54.82% 52.19%, #000000 0%, #1D1D1D 37.36%, #30363A 64.42%)'
        },
        secondary: {
            main: "#5389ed",
            contrastText: "#000"
        },
        primary: {
            main: "#0afcfc",
            light: "#303030",
            dark: "#1F1F1F",
            contrastText: "#fff"
        }
    },
    typography: {
        fontFamily: "Open Sans",
        h1: {
            fontWeight: 700
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Open Sans",
                    color: 'white',
                    border: '1px solid white'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontFamily: "Open Sans",
                    color: 'white'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    zIndex: 9999,
                    background: '#000',
                    color: '#fff'
                },
                
                
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    zIndex: 9999,
                    background: '#000',
                    color: '#fff'
                },
            }
        }
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: 'radial-gradient(107.85% 120.41% at 54.82% 52.19%, rgba(255, 255, 255, 0) 0%, rgba(234, 234, 234, 0.04) 37.36%, rgba(232, 232, 232, 0.54) 64.42%)',
            paper: 'radial-gradient(107.85% 120.41% at 54.82% 52.19%, rgba(255, 255, 255, 0) 0%, rgba(234, 234, 234, 0.04) 37.36%, rgba(232, 232, 232, 0.54) 64.42%)'
        },
        secondary: {
            main: "#5389ed",
            contrastText: "#000"
        },
        primary: {
            // main: "#0afcfc",
            main: "#5D63FF",
            contrastText: "#fff"
        }
    },
    typography: {
        fontFamily: "Open Sans",
        h1: {
            fontWeight: 700
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Open Sans",
                    color: 'white',
                    border: '1px solid white'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontFamily: "Open Sans",
                    color: 'white'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    zIndex: 9999,
                    background: '#fff',
                    color: '#000'
                },
                root: {
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    zIndex: 9999,
                    background: '#fff',
                    color: '#000',
                },
            }
        }
    },
})

// export const darkTheme = createTheme({
//     palette: {
//         type: "dark",
//         secondary: {
//             main: "#1538c2",
//             contrastText: "#fff"
//         },
//         primary: {
//             main: "#0afcfc",
//             contrastText: "#000"
//         },
//     },
// })