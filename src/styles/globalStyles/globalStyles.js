import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;
  height: 100%;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  height: 100%;
  background-color: #efeeee;
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
