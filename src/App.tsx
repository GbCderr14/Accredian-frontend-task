import { ThemeProvider } from "@emotion/react";
import './App.css'
import SignIn from './../pages/auth/signIn';
import SignUp from './../pages/auth/signUp';
import Main from './../pages/main/Main';
import theme from "./theme";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
        <Route
                path="/"
                element={<Navigate to="/signin" />}
            />
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/main" element={<Main />}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
