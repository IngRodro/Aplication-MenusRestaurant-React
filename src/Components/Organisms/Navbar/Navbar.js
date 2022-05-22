import MenuNavbar from '../../Molecules/MenuNavbar';
import { StyleNavbar } from './style';
import Title from '../../Atoms/Title';

const Navbar = () => {
  return (
    <StyleNavbar>
      <Title color="primary" size={30}>
        Restaurants Admin
      </Title>
      <MenuNavbar />
    </StyleNavbar>
  );
};

export default Navbar;
