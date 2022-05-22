import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleThemeIcon,
  StyleCloseSessionIcon,
} from './style';
import { useAppTheme } from '../../../Context/themeContext';

const MenuNavbar = () => {
  const { themeToggle } = useAppTheme();
  return (
    <StyleMenuNavbar>
      <StyleMenuItem onClick={themeToggle} $type={'ActionItem'}>
        <StyleThemeIcon size={24} />
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" $type={'PageItem'}>
        Products
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" $type={'PageItem'}>
        Restaurants
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" $type={'ActionItem'}>
        <StyleCloseSessionIcon size={24} />
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
