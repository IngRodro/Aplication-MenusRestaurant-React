import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleThemeIcon,
  StyleCloseSessionIcon,
} from './style';
import { useAppTheme } from '../../../Context/themeContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'Context/AuthContext';

const MenuNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { themeToggle } = useAppTheme();
  const closeSession = async () => {
    let timerInterval;
    await Swal.fire({
      title: 'Closing session',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    logout();
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
        onClick={() => navigate('/products?page=1', { replace: true })}
      >
        Products
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        $type={'PageItem'}
        onClick={() => navigate('/restaurants', { replace: true })}
      >
        Restaurants
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        $type={'ActionItem'}
        onClick={closeSession}
      >
        <StyleCloseSessionIcon size={24} />
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
