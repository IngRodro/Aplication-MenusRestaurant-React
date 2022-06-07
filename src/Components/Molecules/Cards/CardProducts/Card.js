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
  onWatchMenu,
}) => {
  return (
    <StyleWrapper onClick={action}>
      <StyleImage loading="lazy" src={image} />
      <Title>{name}</Title>
      {isActionButtons && (
        <ActionWrapper>
          {onWatchMenu && (
            <Button color={'info'} onClick={onWatchMenu}>
              Watch Menu
            </Button>
          )}
          {onUpdate && (
            <Button color={'success'} onClick={() => onUpdate()}>
              Update
            </Button>
          )}
          {onDelete && (
            <Button color={'error'} onClick={() => onDelete()}>
              Delete
            </Button>
          )}
        </ActionWrapper>
      )}
    </StyleWrapper>
  );
};

export default CardRestaurant;
