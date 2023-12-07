import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
    AppBar,
    Button,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import Logo from './../../src/assets/favicon.ico';
import AuthBase from "./components/authBase";
import Snackbar, { useSnackbarHook } from "../../src/hooks/useSnackbar";
import { useSetRecoilState } from "recoil";
import { userState } from "./atom";
import Cookies from 'js-cookie';


function SignUpForm() {
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const setTokenInCookie = (token: string) => {
        Cookies.set('authToken', token, { expires: 1 });
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setuserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const showSnackbar = useSnackbarHook();

    async function signup(e: FormEvent): Promise<void> {
        e.preventDefault();
        if (
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            userName === ""
        ) {
            showSnackbar("Please fill the fields", "error", 5000);
            return;
        }
        if (password !== confirmPassword) {
            showSnackbar("Passwords don't match", "error");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setUser({
                    username: responseData.username,
                    email: responseData.email,
                });
                setTokenInCookie(responseData.token);
                navigate('/main');
            } else {
                const errorMessage = await response.text();
                showSnackbar(errorMessage, "error");
            }
        } catch (error) {
            console.error('Error during signup:', error);
            showSnackbar("An unexpected error occurred", "error");
        }


    }

    return (
        <>
            <Box className="mainBox">
                <Box className="topBox">
                    <Box flexGrow={1}>
                        <AppBar
                            position="static"
                            color="transparent"
                            sx={{ boxShadow: 0, paddingTop: { xs: 2, md: 0 } }}
                        >
                            <Toolbar>
                                <Box
                                    component={"img"}
                                    src={Logo}
                                    width={60}
                                />
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Box>
                <Box className="headingBox">
                    <Typography
                        variant="h3"
                        marginX={"auto"}
                        fontSize={40}
                        fontFamily={"sans-serif"}
                        fontWeight={"600"}
                    >
                        Create a new account
                    </Typography>
                    <Typography component={"small"} color={"#032494"}>
                        Get a free account in a few simple steps
                    </Typography>
                    <Box height={"2rem"} />
                    <Box
                        component={"form"}
                        onSubmit={(e: FormEvent) => signup(e)}
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Grid
                            rowSpacing={2}
                            columnSpacing={{
                                xs: 0,
                                md: 2,
                            }}
                            container
                            maxWidth={"sm"}
                            padding={2}
                            borderRadius={2}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={"text"}
                                    value={userName}
                                    onChange={(e) => setuserName(e.target.value)}
                                    size="medium"
                                    label="Username"
                                    name="userName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="medium"
                                    label="Enter your work email"
                                    name="email"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={"password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="medium"
                                    label="Enter a password"
                                    name="password"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={"password"}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    size="medium"
                                    label="Confirm your password"
                                    name="confirmPass"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    sx={{ paddingY: 1, width: "100%" }}
                                    onSubmit={(e: FormEvent) => signup(e)}
                                >
                                    <Typography
                                        textTransform={"none"}
                                        fontSize={20}
                                        fontWeight={"600"}
                                    >
                                        Sign Up Now
                                    </Typography>
                                </Button>
                                <Typography fontSize={16}>
                                    Already have an account?
                                    <Link to="/signin">
                                        <Button
                                            variant="text"
                                            sx={{
                                                textTransform: "none",
                                                fontSize: 16,
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Snackbar />
        </>
    );
}

function SignUp() {
    return <AuthBase component={<SignUpForm />} />;
}

export default SignUp;
