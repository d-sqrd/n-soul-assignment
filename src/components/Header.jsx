import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { isUserLoggedIn, setUserLogout } = useContext(AppContext);

  const handleLogout = () => {
    setUserLogout();
  };
  return (
    <Container
      style={{
        minWidth: "100%",
        display: "flex",
        justifyContent: isUserLoggedIn ? "space-between" : "center",
        top: "0",
        padding: "10px",
      }}
    >
      <h1>Task Manager</h1>
      {isUserLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
    </Container>
  );
};

export default Header;
