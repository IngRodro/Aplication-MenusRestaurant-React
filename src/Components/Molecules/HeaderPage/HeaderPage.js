import Title from 'components/Atoms/Title';
import Button from 'components/Atoms/Button';
import { StyleActions, StyleWrapper, StyleRefreshIcon } from './style';

const HeaderPage = ({ title, onRefresh, onAdd }) => {
  return (
    <StyleWrapper>
      <Title htmlTag="h1" size={75} lineHeight={75}>
        {title}
      </Title>

      <StyleActions>
        {onRefresh && (
          <Button color="success" labelColor="white" onClick={onRefresh}>
            <StyleRefreshIcon size={40} />
          </Button>
        )}
        {onAdd && (
          <Button labelColor="white" onClick={onAdd}>
            Add
          </Button>
        )}
      </StyleActions>
    </StyleWrapper>
  );
};

export default HeaderPage;
