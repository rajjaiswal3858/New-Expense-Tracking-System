import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { message } from "antd";
import "../../styles/HeaderStyles.css";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  transition: "background-color 0.3s ease",
}));

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Expense Management App
            </Link>
          </Typography>
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="body1" color="inherit" style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: 8 }} />
          {loginUser && loginUser.name}
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={logoutHandler}
          style={{ marginLeft: 16 }}
        >
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
