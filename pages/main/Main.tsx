import { AppBar, Toolbar, Typography, Button, Grid, Avatar } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userState } from './../auth/atom'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import Logo from './../../src/assets/favicon.ico';
import { useSnackbarHook } from '../../src/hooks/useSnackbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Main = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate=useNavigate();
  const showSnackbar=useSnackbarHook();
  const handleLogout = () => {
    setUser({
        username: null,
        email: null,
    });
    Cookies.remove('authToken');
    navigate('/signin');
    showSnackbar("Sign-out successfully","success");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = Cookies.get('authToken');

      if (storedToken) {
        try {
          const response = await fetch('http://localhost:3000/getme', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${storedToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser({
              username: userData.username,
              email: userData.email,
            });
          } else {
            Cookies.remove('authToken');
            setUser({
              username: null,
              email: null,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [setUser]); 

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Avatar src={Logo} alt="Logo" />
              </Grid>
              <Grid item>
                <Typography variant="h6">Accredian..</Typography>
              </Grid>
            </Grid>
          </Grid>

          {user && (
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">{user.username}</Typography>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Main;
