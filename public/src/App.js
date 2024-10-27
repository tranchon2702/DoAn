import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/GlobalStyles";
import { lightTheme, darkTheme } from "./utils/theme";
import SetAvatar from "./components/SetAvatar";
import styled from "styled-components";                                                         
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToggleButton from "./components/ToggleButton"; // Nút chuyển đổi theme
                    
export default function App() {
  const [theme, setTheme] = useState("dark"); // Mặc định là dark mode

const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles /> {/* Global styles đồng bộ với theme */}
      <AppContainer>
        <ToggleButton toggleTheme={toggleTheme} currentTheme={theme} /> {/* Nút chuyển đổi theme */}
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background}; /* Đảm bảo rằng nền tổng thể đồng bộ với theme */
  color: ${(props) => props.theme.text}; /* Màu chữ đồng bộ */
`;
