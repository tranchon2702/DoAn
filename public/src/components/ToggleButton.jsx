import React from "react";
import styled from "styled-components";

export default function ToggleButton({ toggleTheme, currentTheme }) {
  return (
    <Button onClick={toggleTheme}>
      {currentTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  );
}

const Button = styled.button`
  background-color: ${(props) => props.theme.contactBackground};
  color: ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.4rem;
  position: fixed; /* Cố định nút */
  top: 10px; /* Căn trên */
  right: 10px; /* Căn phải */
  z-index: 1000; /* Đảm bảo nút hiển thị phía trên */
  transition: all 0.25s linear;
  &:hover {
    background-color: ${(props) => props.theme.headerBackground};
  }
`;
