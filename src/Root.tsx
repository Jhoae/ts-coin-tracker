import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';

import { GlobalStyle } from './styles/globalStyle';
import { darkTheme, lightTheme } from './styles/theme';

import { darken, lighten } from 'polished';
import { ReactQueryDevtools } from 'react-query/devtools';

// https://agal.tistory.com/164 참고
const DarkModeToggleBtn = styled.button`
  float: right;
  ${(props) => {
    const buttonBackgroundColor = props.theme.buttonColor;
    const buttonTextColor = props.theme.textColor;
    return css`
      background-color: ${buttonBackgroundColor};
      color: ${buttonTextColor};
      border: 1px solid ${buttonBackgroundColor};
      border-radius: 5px;
      justify-self: right;
      &:hover {
        cursor: pointer;
        background-color: ${lighten(0.1, buttonBackgroundColor)};
      }
    `;
  }}
`;

function Root() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        {/* <Reset /> */}
        <div className="Root">
          <DarkModeToggleBtn onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'dark' : 'light'}
          </DarkModeToggleBtn>
          <Outlet />
        </div>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default Root;
