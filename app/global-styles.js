import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #F7F7F7;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label,
  h1 {
    font-family: 'Poppins', sans-serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
