import Title from 'components/Atoms/Title';
import { StyleImage, StyleWrapper } from './style';

const CardRestaurant = ({ image, name }) => {
  return (
    <StyleWrapper>
      <StyleImage loading="lazy" src={image} />
      <Title>{name}</Title>
    </StyleWrapper>
  );
};

export default CardRestaurant;
