import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Roboto-Regular';
  src: local('Roboto-Regular'), url(./assets/fonts/Roboto-Regular.tff) format('truetype');
}

:root{
--header-height: 60px;
}

html {
  height: 100%;
  
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: inherit; */
}

body {
  background-color: #efeeee;
  font-family: 'Roboto-Regular', sans-serif;
}

#root {
  min-height: 100%;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0
}

ul {
  margin: 0;
  padding: 0;
}
`;

export default GlobalStyles;