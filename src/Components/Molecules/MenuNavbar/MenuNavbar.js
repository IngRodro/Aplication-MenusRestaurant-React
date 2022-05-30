import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleThemeIcon,
  StyleCloseSessionIcon,
} from './style';
import { useAppTheme } from '../../../Context/themeContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const MenuNavbar = () => {
  const navigate = useNavigate();
  const { themeToggle } = useAppTheme();
  const RemoveCookie = () => {
    cookies.remove('token');
    navigate('/sign');
  };

  const ChangeLocation = (path) => {
    navigate(path);
  };
  return (
    <StyleMenuNavbar>
      <StyleMenuItem
        color="transparent"
        onClick={themeToggle}
        $type={'ActionItem'}
      >
        <StyleThemeIcon size={24} />
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        $type={'PageItem'}
        onClick={() => ChangeLocation('/products?page=1&size=10')}
      >
        Products
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        $type={'PageItem'}
        onClick={() => ChangeLocation('/restaurants')}
      >
        Restaurants
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        $type={'ActionItem'}
        onClick={RemoveCookie}
      >
        <StyleCloseSessionIcon size={24} />
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
