import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import GlobalStyle from './styles/global';
import { themeLight, themeDark } from './styles/theme';
import { AppThemeProvider, useAppTheme } from './Context/themeContext';

const AppRenderTheme = memo(() => {
  const { theme } = useAppTheme();
  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
});

const App = () => {
  return (
    <AppThemeProvider>
      <AppRenderTheme />
    </AppThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
