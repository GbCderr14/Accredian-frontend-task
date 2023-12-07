import { Grid } from "@mui/material";
import Sidebar from "./sidebar";

function AuthBase({ component }: { component: JSX.Element }) {
    return (
        <Grid container>
            <Grid item xs={12} lg={7}>
                    {component}
            </Grid>
            <Grid className="sidebarBox" item xs={12} lg={5}>
                <Sidebar />
            </Grid>
        </Grid>
    );
}

export default AuthBase;
