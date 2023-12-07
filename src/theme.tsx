import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#0C2B94",
        },
        secondary: {
            main: "#1646E9",
        },
        error: {
            main: "#032494",
        },
    },
});

export default theme;
