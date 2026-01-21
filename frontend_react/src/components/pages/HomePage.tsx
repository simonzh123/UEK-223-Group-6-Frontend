import { Box } from "@mui/system";
import logo from "../../logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const { user } = useContext(ActiveUserContext);

  const checkLoggedIn = (): boolean => {
    if (user != null && user.id) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLoggedIn(checkLoggedIn());
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, " + "#0f0fcf, #00d4ff)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "2.5rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Welcome to the Homepage
      </h1>
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          maxWidth: "350px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />
      {isLoggedIn ? (
        <>
          <Button
          id="linkToUser"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#00d4ff",
              "&:hover": { backgroundColor: "#0f0fcf" },
            }}
            onClick={() => navigate("/user")}
          >
            User Page
          </Button>
          <Button
            id="linkToList"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#00d4ff",
              "&:hover": { backgroundColor: "#0f0fcf" },
            }}
            onClick={() => navigate("/list")}
          >
            List Entry Page
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#00d4ff",
            "&:hover": { backgroundColor: "#0f0fcf" },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
