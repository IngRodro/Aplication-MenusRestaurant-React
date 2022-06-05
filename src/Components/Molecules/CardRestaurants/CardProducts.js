import Title from 'components/Atoms/Title';
import { StyleImage, StyleWrapper, ActionWrapper } from './style';
import Button from 'components/Atoms/Button';

const CardRestaurant = ({
  image,
  name,
  action,
  isActionButtons,
  onDelete,
  onUpdate,
}) => {
  return (
    <StyleWrapper onClick={action}>
      <StyleImage loading="lazy" src={image} />
      <Title>{name}</Title>
      {isActionButtons && (
        <ActionWrapper>
          <Button color={'success'} onClick={() => onUpdate()}>
            Update
          </Button>
          <Button color={'error'} onClick={() => onDelete()}>
            Delete
          </Button>
        </ActionWrapper>
      )}
    </StyleWrapper>
  );
};

export default CardRestaurant;
