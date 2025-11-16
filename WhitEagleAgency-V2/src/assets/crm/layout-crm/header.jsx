import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {/* Menu icon could go here */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link to="/crm/home">
            CRM Home
            </Link>
          </Typography>
        </Box>
        <Avatar
          sx={{ bgcolor: "#123f6c", cursor: "pointer" }}
          component={Link}
          to={"/crm/profile"}
        >
          User
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
