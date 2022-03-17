import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
function Header(props) {
  return (
    <div className="Index">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              alt="IMG"
              src="https://cdn-egkni.nitrocdn.com/zOtKFDXFWkLrzjheSCMPaBbJBkqMPlxw/assets/static/optimized/rev-3938da1/wp-content/uploads/2022/01/cropped-logo-landing.png"
              height={60}
              loading="lazy"
            />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
