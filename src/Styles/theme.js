const colorsLight = {
  primary: '#127dff',
  secondary: '#6da9ff',
  accent: '#9c27b0',
  error: '#f44336',
  warning: '#ffeb3b',
  info: '#2196f3',
  success: '#4caf50',
  black: '#000',
  white: '#fff',
  transparent: 'transparent',
  background: '#ffffff',
  backgroundInput: '#127dff',
  buttonText: '#ffffff',
  placeholder: '#767676',
  inputText: '#000000',
  inputBorder: '#000000',
  container: 'rgba(186,186,186,0.5)',
  shadow: 'rgba(2, 1, 1, 0.1)',
  text: '#000000',
  nav: 'rgba(228,223,223,0.7)',
};

const colorsDark = {
  ...colorsLight,
  primary: '#8853fe',
  secondary: '#af93ff',
  background: '#000000',
  inputText: '#000000',
  backgroundInput: '#ffffff',
  text: '#ffffff',
  inputBorder: '#8853fe',
  container: 'rgba(21,21,21,0.5)',
  nav: 'rgba(21,21,21,0.5)',
};

const zIndex = {
  min: -1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  max: 10,
  nav: 20,
  modal: 30,
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1920px',
  desktopL: '2560px',
};

export const themeLight = {
  colors: colorsLight,
  zIndex,
  size,
};

export const themeDark = {
  ...themeLight,
  colors: colorsDark,
  zIndex,
  size,
};
