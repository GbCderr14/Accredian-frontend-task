import {
    AppBar,
    Box,
    Button,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBase from "./components/authBase";
import Logo from "./../../src/assets/favicon.ico";
import Snackbar,{ useSnackbarHook } from "../../src/hooks/useSnackbar";
import { useSetRecoilState } from 'recoil';
import { userState } from './atom';
import Cookies from 'js-cookie';



function SignInForm() {
    const setUser = useSetRecoilState(userState);
    const showSnackbar = useSnackbarHook();
    const email = useRef<string>("");
    const password = useRef<string>("");
    const navigate=useNavigate();
    // / Example function to set a token as a cookie
    const setTokenInCookie = (token:string) => {
    Cookies.set('authToken', token, { expires: 1 });
    };

    async function signin(e: FormEvent): Promise<void> {
        e.preventDefault();
        if (
            email.current === null ||
            password.current === null ||
            email.current === "" ||
            password.current === ""
        ) {
            showSnackbar("Please fill all the required fields", "error");
            return;
        }
        if (
            !email.current
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            showSnackbar("Please fill the email", "error");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.current,
                password: password.current,
              }),
            });
        
            //   Successful signin
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
              setUser({
                username: responseData.username,
                email: responseData.email,
              });
              setTokenInCookie(responseData.token);
              navigate('/main');
            } 
            // Handle error response
            else {
              const errorMessage = await response.text();
              showSnackbar(errorMessage);
            }
          } catch (error) {
            showSnackbar("An unexpected error occurred", "error");
          }
    }

    return (
        <>
        <Box className="mainBox">
            <Box className="topBox">
                <Box flexGrow={1}>
                    <AppBar
                        position="relative"
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
            <Box className={"headingBox"}>
                <Typography
                    variant="h3"
                    marginX={"auto"}
                    fontSize={40}
                    fontFamily={"sans-serif"}
                    fontWeight={"600"}
                >
                    Welcome Back!
                </Typography>
                <Typography component={"small"} color={"#032494"}>
                    Please enter your details to sign in.
                </Typography>
                <Box height={"2rem"} />
                <Box
                    component={"form"}
                    style={{ width: "100%" }}
                    onSubmit={(e: FormEvent) => signin(e)}
                >
                    <Grid
                        container
                        maxWidth={"sm"}
                        marginX={"auto"}
                        padding={2}
                        borderRadius={2}
                        rowSpacing={2}
                    >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={"email"}
                                onChange={(e) =>
                                    (email.current = e.target.value)
                                }
                                size="medium"
                                name="email"
                                inputProps={{ "data-testid": "email" }}
                                label="Email address"
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={"password"}
                                onChange={(e) =>
                                    (password.current = e.target.value)
                                }
                                size="medium"
                                name="password"
                                label="Password"
                                inputProps={{ "data-testid": "password" }}
                                required
                                variant="outlined"
                            />
                                <Button
                                    sx={{
                                        textTransform: "none",
                                        float: "right",
                                    }}
                                >
                                    Forgot your password?
                                </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                disableElevation
                                sx={{ width: "100%" }}
                                onSubmit={(e: FormEvent) => signin(e)}
                            >
                                <Typography
                                    textTransform={"none"}
                                    fontSize={20}
                                    fontWeight={"600"}
                                >
                                    Sign In
                                </Typography>
                            </Button>
                            <Typography fontSize={16}>
                                Dont have an account?
                                <Link to='/signup'>
                                    <Button
                                        variant="text"
                                        sx={{
                                            textTransform: "none",
                                            fontSize: 16,
                                        }}
                                    >
                                        Sign Up
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

function SignIn() {
    return <AuthBase component={<SignInForm />} />;
}

export default SignIn;
