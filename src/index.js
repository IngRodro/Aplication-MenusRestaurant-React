import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Products from './pages/Products';
import GlobalStyle from './styles/global';
import SignPage from './pages/SignPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { themeLight, themeDark } from './styles/theme';
import { AppThemeProvider, useAppTheme } from './Context/themeContext';
import Restaurants from './pages/Restaurants';

const AppRenderTheme = memo(() => {
  const { theme } = useAppTheme();
  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/products" element={<Products />} />
        <Route exact path="/" element={<SignPage />} />
        <Route path="*" element={<SignPage />} />
      </Routes>
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
