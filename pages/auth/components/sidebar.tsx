import { Box } from "@mui/system";
import SideImage from "./../../../src/assets/accredian.png";

function Sidebar() {
    return (
        <Box
            component={"img"}
            sx={{ width: "80%", height: "80%", objectFit: "contain" }}
            src={
                SideImage
            }
        />
        // <Logo />
    );
}

export default Sidebar;
