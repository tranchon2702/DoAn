import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.25s linear;
  }

  input {
    background-color: ${(props) => props.theme.inputBackground};
    color: ${(props) => props.theme.text};
  }
`;

export default GlobalStyles;
